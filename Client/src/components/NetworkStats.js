import UploadIcon from "../icons/NetworkStats/UploadIcon"
import DownloadIcon from "../icons/NetworkStats/DownloadIcon"
import RefreshIcon from "../icons/NetworkStats/RefreshIcon"
import RefreshCheck from "../icons/NetworkStats/RefreshCheck"
import { getNetworkStats } from "@videosdk.live/react-sdk";
import WifiOff from "../icons/NetworkStats/WifiOff";
import { useEffect, useState } from "react";

const NetworkStats = ({ }) => {
  const [error, setError] = useState("no-error-loading")
  const [uploadSpeed, setUploadSpeed] = useState(null)
  const [downloadSpeed, setDownloadSpeed] = useState(null)

  useEffect(() => { getNetworkStatistics(); }, [])

  const getNetworkStatistics = async () => {
    setError("no-error-loading");
    try {
      const options = { timeoutDuration: 45000 }; // Set a custom timeout of 45 seconds
      const networkStats = await getNetworkStats(options);
      if (networkStats) {
        setError("no-error");
      }
      setDownloadSpeed(networkStats["downloadSpeed"]);
      setUploadSpeed(networkStats["uploadSpeed"])
    } catch (ex) {
      if (ex === "Not able to get NetworkStats due to no Network") {
        setError("no-wifi")
      }
      if (ex === "Not able to get NetworkStats due to timeout") {
        setError("timeout")
      }
      console.log("Error in networkStats: ", ex);
    }
  }
  
  const handleOnClick = () => {
    getNetworkStatistics()
  }
  
  return (
    <>
      
    </>
  )
}

export default NetworkStats