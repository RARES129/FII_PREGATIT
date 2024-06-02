import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import axios from "axios";
axios.defaults.withCredentials = true;

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/profile/user")
      .then((userResponse) => {
        setUser(userResponse.data);

        return axios.get("http://localhost:4000/users/profile/success-rates");
      })
      .then((successRatesResponse) => {
        console.log(successRatesResponse.data);
        const successRatesData = successRatesResponse.data;

        const chartData = {
          labels: Object.keys(successRatesData),
          datasets: [
            {
              label: "Success Rate",
              data: Object.values(successRatesData),
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!user || !chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileForm user={user} chartData={chartData} />
    </div>
  );
};

export default ProfileComponent;
