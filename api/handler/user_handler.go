package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/minhtam3010/backlog/db"
)

type Handler struct {
	Handler *db.Querier
}

func NewHandler(handler *db.Querier) *Handler {
	return &Handler{Handler: handler}
}

func (h *Handler) CreateUser(ctx *gin.Context) {
	var data db.User
	err := ctx.BindJSON(&data)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	err = h.Handler.CreateUser(data)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{"message": "success"})
}

func (h *Handler) Login(ctx *gin.Context) {
	var data db.User
	err := ctx.BindJSON(&data)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	res, err := h.Handler.Login(data.Username, data.Password)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if res {
		ctx.JSON(200, gin.H{"message": "true"})
		return
	}
	ctx.JSON(200, gin.H{"message": "fail"})
}

func (h *Handler) GetAllFullNameOfUsers(ctx *gin.Context) {
	res, err := h.Handler.GetAllFullNameOfUsers()
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(200, gin.H{"data": res})
}
