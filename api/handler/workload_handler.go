package handler

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/minhtam3010/backlog/db"
)

func (h *Handler) CreateWorkload(ctx *gin.Context) {
	var data db.Workload
	var id string
	err := ctx.BindJSON(&data)
	log.Println("?")

	if err != nil {
		log.Println(err.Error())
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	id, err = h.Handler.CreateWorkload(data)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{"data": id})
}

func (h *Handler) GetAllWorkload(ctx *gin.Context) {
	res, err := h.Handler.QueryAllWorkload()

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{"data": res})
}

func (h *Handler) UpdateWorkload(ctx *gin.Context) {
	var data db.Workload
	err := ctx.BindJSON(&data)
	log.Println(data)
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.Handler.UpdateWorkload(data)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{"message": "success"})
	ctx.Header("Access-Control-Allow-Origin", "http://localhost:5173")
	ctx.Status(http.StatusOK)
}
