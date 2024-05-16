package main

import (
	"encoding/json"
	"os"
	"time"
)

type Creator struct {
    ID    string `json:"id"`
    Email string `json:"email"`
}

type Product struct {
    ID         string    `json:"id"`
    CreatorID  string    `json:"creatorId"`
    CreateTime time.Time `json:"createTime"`
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
    err = decoder.Decode(&data)
    return data, err
}
