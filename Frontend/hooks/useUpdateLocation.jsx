import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";

const useUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData || !navigator.geolocation) return;

    const updateLocation = async (lat, lon) => {
      try {
        const _result = await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true },
        );
        // console.log(result.data);

        // if (result.data.success) {
        //   console.log("Location updated:", result.data);
        // }
      } catch (error) {
        console.log("Location update failed:", error?.response?.data || error);
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        updateLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log("Geolocation error:", err);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userData]);
};

export default useUpdateLocation;
