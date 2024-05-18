package main

import (
	"encoding/json"
	"os"
	"time"
)

type Creator struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	Username     string `json:"username"`
	CreatorImage string `json:"creatorImage"`
}

type Product struct {
	ID          string    `json:"id"`
	CreatorID   string    `json:"creatorId"`
	CreateTime  time.Time `json:"createTime"`
	ProductName string    `json:"productName"`
	ProductImage string   `json:"productImage"`
}

type Data struct {
	Creators []Creator `json:"Creators"`
	Products []Product `json:"Products"`
}

func loadJSON() (Data, error) {
	var data Data
	file, err := os.Open("data/creators_products.json")
	if err != nil {
		return data, err
	}
	defer file.Close()
	
	decoder := json.NewDecoder(file)
	raw := struct {
		Creators []Creator `json:"Creators"`
		Products []struct {
			ID          string `json:"id"`
			CreatorID   string `json:"creatorId"`
			CreateTime  string `json:"createTime"`
			ProductName string `json:"productName"`
			ProductImage string `json:"productImage"`
		} `json:"Products"`
	}{}
	
	err = decoder.Decode(&raw)
	if err != nil {
		return data, err
	}

	data.Creators = raw.Creators
	for _, p := range raw.Products {
		createTime, err := time.Parse(time.RFC3339, p.CreateTime)
		if err != nil {
			return data, err
		}
		product := Product{
			ID:          p.ID,
			CreatorID:   p.CreatorID,
			CreateTime:  createTime,
			ProductName: p.ProductName,
			ProductImage: p.ProductImage,
		}
		data.Products = append(data.Products, product)
	}
	return data, nil
}
