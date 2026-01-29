import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "./store/tableSlice";

function Form() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const now = new Date();

    const formattedId =
      `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_` +
      `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

    const newRow = {
      id: formattedId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
    };

    dispatch(addRow(newRow));
    reset();
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "20px" }}>
      <h2>Add New Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Name" {...register("name", { required: true })} />
          {errors.name && <span style={{ color: "red" }}>Name is required</span>}
        </div>

        <div>
          <input placeholder="Email" {...register("email", { required: true })} />
          {errors.email && <span style={{ color: "red" }}>Email is required</span>}
        </div>

        <div>
          <input placeholder="Phone" {...register("phone", { required: true })} />
          {errors.phone && <span style={{ color: "red" }}>Phone is required</span>}
        </div>

        <div>
          <input placeholder="City" {...register("city", { required: true })} />
          {errors.city && <span style={{ color: "red" }}>City is required</span>}
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Form;
