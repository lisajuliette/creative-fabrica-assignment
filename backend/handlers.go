package main

import (
	"encoding/json"
	"net/http"
	"sort"
	"time"
)

func getTopCreators(w http.ResponseWriter, r *http.Request) {
    data, err := loadJSON()
    if (err != nil) {
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

    topCreators := data.Creators[:3]
    json.NewEncoder(w).Encode(topCreators)
}
