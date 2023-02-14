import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [isNewRow, setIsNewRow] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [addNewRow, setAddNewRow] = useState(null);

  const [dateTimeNow, setDateTimeNow] = useState("");

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      time: "2022-12-12",
      title: "open canva",
      description: "go to canva.com",
      due_date: "2023-01-15",
      tag: "first step",

      status: "DONE",
    },
    {
      id: 2,
      time: "2023-01-10",
      title: "create new project",
      description: "click on 'new project'",
      due_date: "2023-02-17",
      tag: "second step",
      status: "DONE",
    },
    {
      id: 3,
      time: "2023-01-19",
      title: "create a rough design",
      description: "use only native design available in canva.com",
      due_date: "2023-02-23",
      tag: "third step",
      status: "DONE",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time.localeCompare(b.time),
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      onFilter: (value, record) => {
        return record.title.includes(value);
      },
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "due_date",
    },
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      filters: [
        { text: "second", value: "second step" },
        { text: "third", value: "third step" },
      ],
      onFilter: (value, record) => record.tag === value,
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "WORKING", value: "WORKING" },
        { text: "DONE", value: "DONE" },
        { text: "OVERDUE", value: "OVERDUE" },
      ],
      onFilter: (value, record) => record.status === value,
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
      },
    },
  ];

  const onAddStudent = () => {
    setIsNewRow(true);
    var today = new Date();

    setDateTimeNow(
      today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " "
    );
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setIsNewRow(false);
    setEditingStudent(null);
    setAddNewRow(null);
  };

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
    } else {
      alert("please enter all fields!");
    }
  };

  const handleSubmitNew = () => {
    if (addNewRow.title && addNewRow.description && addNewRow.status) {
      setDataSource((pre) => {
        return [...pre, addNewRow];
      });
      resetEditing();
    } else {
      alert("enter all fields");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <Input.Search placeholder="Search Title" /> */}
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit To-Do"
          visible={isEditing}
          onCancel={() => {
            resetEditing();
          }}
          footer={[
            <div>
              <Button onClick={resetEditing}>Cancel</Button>
              <Button form="form1" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </div>,
          ]}
        >
          <form id="form1">
            <div>
              <DatePicker value={editingStudent?.time} disabled />
              <Input
                type="text"
                value={editingStudent?.title}
                required
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                }}
              />
              <Input
                type="text"
                value={editingStudent?.description}
                required
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, description: e.target.value };
                  });
                }}
              />
              {/* <DatePicker
                selected={new Date(editingStudent?.due_date)}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, due_date: e.target.value };
                  });
                }}
              /> */}
              {/* <DatePicker
              selected={new Date(editingStudent?.due_date)}
              minDate={new Date(editingStudent?.time)}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, due_date: e };
                });
              }}
            /> */}
                    
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} /> */}
              {/* <TextField type="date" /> */}
              <TextField
                type="date"
                value={editingStudent?.due_date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, due_date: e.target.value };
                  });
                }}
              />
              <Button
                onClick={() => {
                  console.log(editingStudent?.due_date);
                }}
              >
                Print Value
              </Button>
              <Input
                value={editingStudent?.tag}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, tag: e.target.value };
                  });
                }}
              />
              <label>Status: </label>
              <select
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
          </form>
        </Modal>

        <Button onClick={onAddStudent}>Add a new row</Button>

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
            </div>,
          ]}
        >
          <form id="form2">
            <DatePicker
              value={dateTimeNow}
              disabled="true"
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, time: e };
                });
              }}
            />
            <Input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, title: e.target.value, time: dateTimeNow };
                });
              }}
            />
            <Input
              placeholder="Description"
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, description: e.target.value };
                });
              }}
            />
            <DatePicker
              type="date"
              min={new Date(dateTimeNow)}
              placeholder="Date"
              onClockClose={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, due_date: e.target.value };
                });
              }}
            />
            <Input
              placeholder="Tag"
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, tag: e.target.value };
                });
              }}
            />
            <select
              placeholder="status"
              required
              onChange={(e) => {
                setAddNewRow((pre) => {
                  return { ...pre, status: e.target.value };
                });
              }}
            >
              <option value="OPEN">Open</option>
              <option value="DONE">Done</option>
              <option value="WORKING">Working</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </form>
        </Modal>
      </header>
    </div>
  );
}

export default App;
