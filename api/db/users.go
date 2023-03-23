package db

import (
	"database/sql"
	"time"
)

type User struct {
	ID          int    `json:"id"`
	Username    string `json:"username"`
	Password    string `json:"password"`
	FullName    string `json:"fullName"`
	EntityCode  int    `json:"entityCode"`
	Active      int    `json:"active"`
	DateCreated string `json:"dateCreated"`
	DateUpdated string `json:"dateUpdated"`
}

func (q *Querier) CreateUser(data User) (err error) {
	date := time.Now().String()[:19]
	_, err = q.DB.Exec("INSERT INTO users (user_name, password, full_name, entity_code, active, date_created, date_updated) VALUES (?, ?, ?, ?, ?, ?, ?)", data.Username, data.Password, data.FullName, 2, 1, date, nil)
	return
}

func (q *Querier) Login(username, password string) (bool, error) {
	var (
		res User
	)
	err := q.DB.QueryRow("SELECT id FROM users WHERE user_name = ? AND password = ?", username, password).Scan(&res.ID)
	if sql.ErrNoRows == err {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	if res.ID == 0 {
		return false, nil
	}

	return true, nil
}

func (q *Querier) GetAllFullNameOfUsers() (res []User, err error) {
	rows, err := q.DB.Query("SELECT id, full_name FROM users where active = 1")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err = rows.Scan(&user.ID, &user.FullName)
		if err != nil {
			return
		}
		res = append(res, user)
	}
	return
}

func (q *Querier) QuerySpecificFullNameOfUser(id int) (fullName string, err error) {
	err = q.DB.QueryRow("SELECT full_name FROM users WHERE id = ?", id).Scan(&fullName)
	return
}
