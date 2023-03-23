// export interface UserInterface {
//     id: number;
//     username: string;
//     password: string;
//     fullName: string;
//     entityCode: number;
//     active: number;
//     dateCreated: string;
//     dateUpdated: string;
// }

export const GetUserFullName = () => {
  const fetchData = async () => {
    const result = await fetch("http://localhost:8080/api/name")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return result;
  };
  return fetchData();
};

export const GetWorkLoad = () => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/workload/all")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        return data["data"];
      });
    return res;
  };
  return fetchData();
};

export const CreateWorkload = () => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/workload/create", {
      method: "POST",
      body: JSON.stringify({
        jobName: "",
        workPriority: "",
        progress: "",
        dateStarted: "",
        dateCompleted: "",
        pic: 0,
        note: "",
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        return data["data"];
      });
    return res;
  };
  return fetchData();
};

export const UpdateWorkload = (data1, flag: number) => {
  const update = async () => {
    await fetch(`http://localhost:8080/api/workload/update?flag=${flag}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id: data1?.id ?? "",
        jobName: data1?.jobName,
        workPriority: data1?.workPriority ?? "",
        progress: data1?.progress ?? "",
        dateStarted: data1?.dateStarted ?? "",
        dateCompleted: data1?.dateCompleted ?? "",
        pic: data1?.pic ?? 0,
        note: data1?.note ?? "",
        content: data1?.content ?? "",
      }),
    });
  };
  return update();
};

export const RequestLogin = ({ username, password }) => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username: username ?? "",
        password: password ?? "",
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        return data["message"];
      });
    return res;
  };
  return fetchData();
};
