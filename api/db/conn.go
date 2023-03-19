package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

type Querier struct {
	DB *sql.DB
}

func ConnectDB() *sql.DB {
	db, err := sql.Open("mysql", "root:quynhnhu2010@tcp(127.0.0.1:3306)/backlog")
	if err != nil {
		panic(err)
	}

	return db
}

func NewQuerier() *Querier {
	db := ConnectDB()
	return &Querier{db}
}
