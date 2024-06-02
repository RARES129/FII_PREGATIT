import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Formik, Form } from "formik";
import { FormGroup } from "react-bootstrap";

const ProfileForm = ({ user, chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 0,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="form-wrapper-profile">
      <Formik>
        <Form>
          <FormGroup className="form-group">
            <h1>Profile</h1>
          </FormGroup>
          <FormGroup className="form-group">
            <p>
              <h5>Username:</h5>
              <h6>{user.name}</h6>
            </p>
          </FormGroup>
          <FormGroup className="form-group">
            <p>
              <h5>Email:</h5>
              <h6>{user.email}</h6>
            </p>
          </FormGroup>
          <FormGroup className="form-group">
            <div className="chart-container">
              <Bar data={chartData} options={options} />
            </div>
          </FormGroup>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;
