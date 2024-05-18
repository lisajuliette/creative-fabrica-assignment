package main

import (
	"encoding/json"
	"net/http"
	"sort"
	"time"

	"github.com/gorilla/mux"
)

type ResponseCreator struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	Username     string `json:"username"`
	CreatorImage string `json:"creatorImage"`
	ProductCount int    `json:"productCount"`
	Rank         int    `json:"rank"`
}

type CreatorDetailsResponse struct {
	Creator  ResponseCreator `json:"creator"`
	Products []Product       `json:"products"`
}

func getCreators(w http.ResponseWriter, r *http.Request) {
	data, err := loadJSON()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	creatorProductCount := make(map[string]int)
	creatorLatestProduct := make(map[string]time.Time)

	for _, product := range data.Products {
		creatorProductCount[product.CreatorID]++
		if product.CreateTime.After(creatorLatestProduct[product.CreatorID]) {
			creatorLatestProduct[product.CreatorID] = product.CreateTime
		}
	}

	sort.Slice(data.Creators, func(i, j int) bool {
		if creatorProductCount[data.Creators[i].ID] == creatorProductCount[data.Creators[j].ID] {
			return creatorLatestProduct[data.Creators[i].ID].After(creatorLatestProduct[data.Creators[j].ID])
		}
		return creatorProductCount[data.Creators[i].ID] > creatorProductCount[data.Creators[j].ID]
	})

	var responseCreators []ResponseCreator
	for index, creator := range data.Creators {
		responseCreators = append(responseCreators, ResponseCreator{
			ID:           creator.ID,
			Email:        creator.Email,
			Username:     creator.Username,
			CreatorImage: creator.CreatorImage,
			ProductCount: creatorProductCount[creator.ID],
			Rank:         index + 1,
		})
	}

	json.NewEncoder(w).Encode(responseCreators)
}

func getCreatorDetails(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	creatorId := vars["creatorId"]

	data, err := loadJSON()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var creator Creator
	var products []Product

	for _, c := range data.Creators {
		if c.ID == creatorId {
			creator = c
			break
		}
	}

	for _, p := range data.Products {
		if p.CreatorID == creatorId {
			products = append(products, p)
		}
	}

	responseCreator := ResponseCreator{
		ID:           creator.ID,
		Email:        creator.Email,
		Username:     creator.Username,
		CreatorImage: creator.CreatorImage,
		ProductCount: len(products),
	}

	response := CreatorDetailsResponse{
		Creator:  responseCreator,
		Products: products,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
