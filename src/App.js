//importing libraries
import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Form } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import TextField from "@mui/material/TextField";

//initializing the main component of the React application
function App() {
  //declaring variables
  //modal variables
  const [isEditing, setIsEditing] = useState(false);
  const [isNewRow, setIsNewRow] = useState(false);

  //temp variables
  const [editingStudent, setEditingStudent] = useState(null);
  const [addNewRow, setAddNewRow] = useState(null);

  //fucntionality focus variable
  const [dateTimeNow, setDateTimeNow] = useState("");
  const [searchedText, setSearchedText] = useState("");

  //initializers
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  //declaring a constant variable dataSource and function to create and modify the json respectfully
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      time: "2022-12-12",
      title: "open canva",
      description: "go to canva.com",
      due_date: "2023-01-15",
      tag: "first step",

      status: "DONE"
    },
    {
      id: 2,
      time: "2023-01-10",
      title: "create new project",
      description: "click on 'new project'",
      due_date: "2023-02-17",
      tag: "second step",
      status: "DONE"
    },
    {
      id: 3,
      time: "2023-01-19",
      title: "create a rough design",
      description: "use only native design available in canva.com",
      due_date: "2023-02-23",
      tag: "third step",
      status: "DONE"
    },
    {
      id: 4,
      time: "2023-01-24",
      title: "finalize designs and colors",
      description: "use only staple colors",
      due_date: "2023-02-28",
      tag: "fourth step",
      status: "DONE"
    },
    {
      id: 5,
      time: "2023-01-30",
      title: "start phase 1 design",
      description: "time constraint",
      due_date: "2023-02-29",
      tag: "fifth step",
      status: "WORKING"
    }
  ]);
  //creating variable to pass into Table tag as parameter and adding functionality to enable sort and filters
  const columns = [
    {
      key: "1",
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time.localeCompare(b.time)
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      filteredValue: [searchedText],
      onFilter: (a, b) => {
        return String(b.title).toLowerCase().includes(a);
      }
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "due_date"
    },
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      filters: [
        { text: "second", value: "second step" },
        { text: "third", value: "third step" }
      ],
      onFilter: (a, b) => b.tag.value === a
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "WORKING", value: "WORKING" },
        { text: "DONE", value: "DONE" },
        { text: "OVERDUE", value: "OVERDUE" }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      }
    }
  ];

  //function that displays the modal and generate current date
  const onAddStudent = () => {
    setIsNewRow(true);
    var today = new Date();

    setDateTimeNow(
      today.getFullYear() +
        "-" +
        "0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " "
    );
  };

  //function that creates a pop up to confirm the action
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      }
    });
  };

  //function that enables the edit option using a modal
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  //function that closes all modals and resets values
  const resetEditing = () => {
    setIsEditing(false);
    setIsNewRow(false);
    setEditingStudent(null);
    setAddNewRow(null);
    form2.resetFields();
  };

  //function that validates and makes changes to the existing data
  const handleSubmit = () => {
    if (
      editingStudent.title &&
      editingStudent.description &&
      editingStudent.status
    ) {
      setDataSource((pre) => {
        return pre.map((student) => {
          if (student.id === editingStudent.id) {
            return editingStudent;
          } else {
            return student;
          }
        });
      });
      resetEditing();
      form1.resetFields();
    } else {
      alert("please enter all fields!");
    }
  };

  //function that validates and appends newly entered data to database
  const handleSubmitNew = () => {
    if (addNewRow.title && addNewRow.description && addNewRow.status) {
      setDataSource((pre) => {
        return [...pre, addNewRow];
      });
      resetEditing();
      setAddNewRow(null);
    } else {
      alert("enter all fields");
    }
  };

  //entering all front end jsx elements that has to be display
  return (
    //root element
    <div className="App">
      <body className="App-header">
        <Input.Search
          id="searchBar"
          placeholder="Search Title"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          style={{ marginBottom: 9 }}
        />

        {/* table that renders the json object */}
        <Table id="tableMain" columns={columns} dataSource={dataSource}></Table>
        {/* modal 1: to edit the existing row in table */}
        <Modal
          title="Edit To-Do"
          visible={isEditing}
          onCancel={() => {
            resetEditing();
          }}
          footer={[
            //buttons to make changes and to cancel operation
            <div>
              <Button onClick={resetEditing}>Cancel</Button>
              <Button form="form1" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          ]}
        >
          <p style={{ color: "red", marginBottom: "25px" }}>
            Fields marked with an asterisk (*) are mandatory.
          </p>
          {/* form that shows the data as default, enables the user to edit and
          submit */}
          <Form form={form1}>
            <div>
              <label htmlFor="tag1">Creation Date</label>

              <DatePicker value={editingStudent?.time} disabled />
              <label htmlFor="title1" style={{ marginTop: "15px" }}>
                Title<span style={{ color: "red" }}>*</span>
              </label>
              <Input
                id="title1"
                type="text"
                value={editingStudent?.title}
                required
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                }}
              />
              <label htmlFor="description1" style={{ marginTop: "15px" }}>
                Description<span style={{ color: "red" }}>*</span>
              </label>
              <Input
                id="description1"
                type="text"
                value={editingStudent?.description}
                required
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, description: e.target.value };
                  });
                }}
              />

              <TextField
                label="Due Date"
                type="date"
                value={editingStudent?.due_date}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, due_date: e.target.value };
                  });
                }}
                inputProps={{ min: editingStudent?.time }}
                style={{ marginBottom: "15px", marginTop: "15px" }}
              />

              <Input
                label="Tag"
                placeholder="Tag"
                id="tag1"
                value={editingStudent?.tag}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, tag: e.target.value };
                  });
                }}
              />
              <label htmlFor="status2" style={{ marginTop: "15px" }}>
                Status<span style={{ color: "red" }}>*</span>
              </label>
              <select
                label="Status"
                id="status2"
                style={{ marginTop: "15px" }}
                value={editingStudent?.status}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, status: e.target.value };
                  });
                }}
              >
                <option value="OPEN">Open</option>
                <option value="DONE">Done</option>
                <option value="WORKING">Working</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>
          </Form>
        </Modal>

        {/* button that enables the user to enter new data */}
        <Button id="addBtn" onClick={onAddStudent}>
          Add a new row
        </Button>

        {/* modal 2: Add New Row with madatory and optional fields  */}
        <Modal
          title="Add To-Do"
          visible={isNewRow}
          onCancel={() => {
            resetEditing();
          }}
          footer={[
            <div>
              <Button onClick={resetEditing}>Cancel</Button>
              <Button form="form2" type="submit" onClick={handleSubmitNew}>
                Add
              </Button>
            </div>
          ]}
        >
          <p style={{ color: "red", marginBottom: "25px" }}>
            Fields marked with an asterisk (*) are mandatory.
          </p>
          {/* //form that collects the data from the user */}
          <Form id="form2" form={form2}>
            <label htmlFor="tag1">Creation Date</label>

            <DatePicker id="dp" value={dateTimeNow} disabled="true" />
            <label style={{ marginTop: "15px" }}>
              Title<span style={{ color: "red" }}>*</span>
            </label>
            <Input
              defaultValue=" "
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, title: e.target.value, time: dateTimeNow };
                });
              }}
            />
            <label style={{ marginTop: "15px" }}>
              Description<span style={{ color: "red" }}>*</span>
            </label>
            <Input
              defaultValue=" "
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, description: e.target.value };
                });
              }}
              style={{ marginBottom: "15px" }}
            />
            {/* <label htmlFor="tag1">Due Date</label>
            <Input
              type="date"
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, due_date: e.target.value };
                });
              }}
              inputProps={{ min: dateTimeNow }}
            /> */}
            <TextField
              defaultValue=""
              label="Due Date"
              type="date"
              inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, due_date: e.target.value };
                });
              }}
              style={{ marginBottom: "15px" }}
            />

            <Input
              defaultValue=""
              placeholder="Tag"
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, tag: e.target.value };
                });
              }}
            />
            <label style={{ marginTop: "10px" }}>
              Status<span style={{ color: "red" }}>*</span>
            </label>
            <select
              defaultValue=" "
              placeholder="status"
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, status: e.target.value };
                });
              }}
              style={{ marginTop: "15px" }}
            >
              <option value="">Select Option</option>
              <option value="OPEN">Open</option>
              <option value="DONE">Done</option>
              <option value="WORKING">Working</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </Form>
        </Modal>
      </body>
    </div>
  );
}

//setting default export of module
export default App;
