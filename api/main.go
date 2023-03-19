package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/minhtam3010/backlog/db"
	"github.com/minhtam3010/backlog/handler"
)

func main() {
	r := gin.Default()

	r.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if ctx.Request.Method == "OPTIONS" {
			return
		}
	})

	// handle OPTIONS requests
	r.OPTIONS("/api/workload/update", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Status(http.StatusOK)
	})

	r.SetTrustedProxies(nil)
	conn := db.NewQuerier()

	handler := handler.NewHandler(conn)
	r.GET("/api/login", handler.Login)
	r.GET("/api/name", handler.GetAllFullNameOfUsers)
	r.GET("/api/workload/all", handler.GetAllWorkload)

	r.POST("/api/create", handler.CreateUser)
	r.POST("/api/workload/create", handler.CreateWorkload)

	r.PUT("/api/workload/update", handler.UpdateWorkload)

	err := r.Run(":8080")
	if err != nil {
		panic(err)
	}
}
