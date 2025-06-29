import Typography from "@mui/material/Typography";
import styles from "../styles/NewCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { api } from "../api";
import { Button } from "@mui/material";

function NewCard({ initialData = {}, mode = "add" }) {
  const [imgPreview, setImgPreview] = useState(initialData?.image || "");

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("last_day", data.lastDay);
    formData.append("country", data.country);
    formData.append("image", data.img);

    try {
      if (mode === "update" && initialData?.id) {
        await axios.put(`${api}/${initialData.id}`, formData);
        return;
      } else {
        await axios.post(api, formData);
      }
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      img: initialData?.image || "",
      price: initialData?.price || "",
      quantity: initialData?.quantity || "",
      lastDay: initialData?.last_day
        ? new Date(initialData?.last_day).toISOString().slice(0, 10)
        : "",
      country: initialData?.country || "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.title) errors.title = "Title is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.quantity) errors.quantity = "Quantity is required";
      if (!values.country) errors.quantity = "Country is required";
      return errors;
    },
  });

  const handleImgChange = (e) => {
    const img = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
      formik.setFieldValue("img", img);
    };
    reader.readAsDataURL(img);
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <div className={styles.container}>
        <div
          className={styles.imgBox}
          style={{
            background: imgPreview
              ? `url('${imgPreview}') no-repeat center`
              : "inherit",
          }}
        >
          <label
            onClick={() => setImgPreview(null)}
            style={{
              position: "absolute",
              top: 0,
              right: 10,
              color: "white",
              fontSize: 22,
            }}
          >
            x
          </label>

          <label
            htmlFor="addImg"
            className={styles.addBtn}
            style={{ display: !imgPreview ? "flex" : "none" }}
          >
            <AddIcon />
          </label>
          <input
            id="addImg"
            accept="image/*"
            hidden
            type="file"
            onChange={handleImgChange}
          />
        </div>
        <Typography className={styles.title} variant="h6" component="h3">
          Title
        </Typography>
        <input
          placeholder="Enter title"
          className={styles.inputField}
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <Typography className={styles.title} variant="h6" component="h3">
          Description
        </Typography>
        <textarea
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          placeholder="Enter description"
          className={styles.descriptionField}
        />
        <div style={{ display: "flex", width: "90%", gap: "10%" }}>
          <div style={{ flex: 1 }}>
            <Typography>Price</Typography>
            <input
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder="Enter price"
              className={styles.inputField}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Quantity</Typography>
            <input
              className={styles.inputField}
              name="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter quantity"
              value={formik.values.quantity}
            />
          </div>
        </div>

        <div style={{ display: "flex", width: "90%", gap: "10%" }}>
          <div style={{ flex: 1 }}>
            <Typography>Country</Typography>
            <input
              className={styles.inputField}
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              placeholder="Enter country"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Last day</Typography>
            <input
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.inputField}
              name="lastDay"
              value={formik.values.lastDay}
            />
          </div>
        </div>
        <Button
          type="submit"
          style={{ textTransform: "capitalize", marginTop: 20 }}
          variant="outlined"
        >
          {mode === "update" ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}

export default NewCard;
