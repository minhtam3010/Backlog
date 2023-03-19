package db

import (
	"time"

	"github.com/google/uuid"
)

type Workload struct {
	ID            string `json:"id"`
	JobName       string `json:"jobName"`
	WorkPriority  string `json:"workPriority"`
	Progress      string `json:"progress"`
	DateStarted   string `json:"dateStarted"`
	DateCompleted string `json:"dateCompleted"`
	PIC           int    `json:"pic"`
	PICFullName   string `json:"picFullname"`
	Note          string `json:"note"`
}

func (q *Querier) CreateWorkload(data Workload) (id string, err error) {
	date := time.Now().String()[:19]
	id = uuid.New().String()
	_, err = q.DB.Exec("INSERT INTO workloads (id, job_name, work_priority, progress, date_started, date_completed, pic, note, active, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		id, data.JobName, data.WorkPriority, data.Progress, data.DateStarted, data.DateCompleted, data.PIC, data.Note, 1, date)
	return
}

func (q *Querier) QueryAllWorkload() (res []Workload, err error) {
	rows, err := q.DB.Query("SELECT id, job_name, work_priority, progress, date_started, date_completed, pic, note FROM workloads WHERE active = 1 ORDER BY date_created")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var workload Workload
		err = rows.Scan(&workload.ID, &workload.JobName, &workload.WorkPriority, &workload.Progress, &workload.DateStarted, &workload.DateCompleted, &workload.PIC, &workload.Note)
		if err != nil {
			return
		}

		if workload.PIC > 0 {
			workload.PICFullName, err = q.QuerySpecificFullNameOfUser(workload.PIC)
		} else {
			workload.PICFullName = ""
		}
		res = append(res, workload)
	}
	return
}

func (q *Querier) UpdateWorkload(data Workload) (err error) {
	_, err = q.DB.Exec("UPDATE workloads SET job_name = ?, work_priority = ?, progress = ?, date_started = ?, date_completed = ?, pic = ?, note = ? WHERE id = ?", data.JobName, data.WorkPriority, data.Progress, data.DateStarted, data.DateCompleted, data.PIC, data.Note, data.ID)
	return
}
