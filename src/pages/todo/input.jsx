import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Navbar from "@/component/navbar";
import { Button } from "@mui/material";
import { useAddTodoMutation } from "./todoApi";
import styles from "@/styles/Input.module.css";
import { useRouter } from "next/router";

export default function BasicTextFields() {
  const route = useRouter()
  const [name, setName] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addTodo({ name }).unwrap();
      alert(JSON.stringify(response));
    } catch {
      alert("err");
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles["input-content"]}>
        <form onSubmit={HandleSubmit}>
          <TextField
            value={name}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={handleNameChange}
          />
          <div>
          <Button variant="outlined" type="submit">
            Simpan
          </Button>
          <Button color="warning" variant="outlined" type="button" onClick={()=>route.push("/todo/list")}>
            Batal
          </Button>
          </div>
        </form>
      </div>
    </>
  );
}
