package db

import (
	"errors"
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
	Content       string `json:"content"`
}

func (q *Querier) CreateWorkload(data Workload) (id string, err error) {
	date := time.Now().String()[:19]
	id = uuid.New().String()
	_, err = q.DB.Exec("INSERT INTO workloads (id, job_name, work_priority, progress, date_started, date_completed, pic, note, active, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		id, data.JobName, data.WorkPriority, data.Progress, "", "", data.PIC, data.Note, 1, date)
	return
}

func (q *Querier) QueryAllWorkload() (res []Workload, err error) {
	rows, err := q.DB.Query("SELECT workloads.id, job_name, work_priority, progress, date_started, date_completed, pic, note, content FROM workloads inner join work_details on workloads.id = work_details.work_load_id WHERE active = 1 ORDER BY workloads.date_created")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var workload Workload
		err = rows.Scan(&workload.ID, &workload.JobName, &workload.WorkPriority, &workload.Progress, &workload.DateStarted, &workload.DateCompleted, &workload.PIC, &workload.Note, &workload.Content)
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

/*
1. Update Progress
2. Update Date Started - Date Completed
3. Update PIC
4. Update Note
*/
func (q *Querier) UpdateWorkload(data Workload, flag int) (err error) {
	switch flag {
	case 1:
		_, err = q.DB.Exec("UPDATE workloads SET progress = ? WHERE id = ?", data.Progress, data.ID)
		return err
	case 2:
		_, err = q.DB.Exec("UPDATE workloads SET date_started = ?, date_completed = ? WHERE id = ?", data.DateStarted, data.DateCompleted, data.ID)
		return
	case 3:
		_, err = q.DB.Exec("UPDATE workloads SET pic = ? WHERE id = ?", data.PIC, data.ID)
		return
	case 4:
		_, err = q.DB.Exec("UPDATE workloads SET note = ? WHERE id = ?", data.Note, data.ID)
		return
	case 5:
		_, err = q.DB.Exec("UPDATE workloads SET job_name = ? WHERE id = ?", data.JobName, data.ID)
		return
	case 6:
		_, err = q.DB.Exec("UPDATE workloads SET work_priority = ? WHERE id = ?", data.WorkPriority, data.ID)
		return
	case 7:
		_, err = q.DB.Exec("UPDATE work_details SET content = ? WHERE work_load_id = ?", data.Content, data.ID)
	default:
		err = errors.New("invalid flag")
	}
	return
}

func (q *Querier) CreateWorkDetails(content string, workload_id string) (err error) {
	date := time.Now().String()[:19]
	_, err = q.DB.Exec("insert into work_details(work_load_id, content, date_created) values (?, ?, ?)", workload_id, content, date)
	return
}

func (q *Querier) UpdateWorkDetails(content string, workload_id string) (err error) {
	dateUpdate := time.Now().String()[:19]
	_, err = q.DB.Exec("update work_details set content = ?, date_updated = ? where work_load_id = ?", content, dateUpdate, workload_id)
	return
}
