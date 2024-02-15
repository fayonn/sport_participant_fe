import {useDispatch, useSelector} from "react-redux";
import {gymBrandsSelector} from "../../store/slices/gymBrandsSlice";
import {locationsSelector} from "../../store/slices/locationsSlice";
import {useEffect, useState} from "react";
import StatisticsService from "../../services/StatisticsService";
import {setStatistics, statisticsSelector} from "../../store/slices/statistacsSlice";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


export const StatisticPage = () => {
  const {currentGymBrand} = useSelector(gymBrandsSelector)
  const {currentLocation} = useSelector(locationsSelector)
  const {statistics} = useSelector(statisticsSelector)
  const dispatch = useDispatch()
  const [noData, setNoData] = useState(true)

  useEffect(() => {
    if (!!(currentGymBrand.id && currentLocation.id && currentLocation.id !== '' && currentGymBrand.id !== '')) {
      StatisticsService.get({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      })
        .then(({data}) => {
          dispatch(setStatistics(data))
          setNoData(false)
        })
    }
    else {
      dispatch(setStatistics(null))
      setNoData(true)
    }
  }, [])

  useEffect(() => {
    if (!!(currentGymBrand.id && currentLocation.id && currentLocation.id !== '' && currentGymBrand.id !== '')) {
      StatisticsService.get({
        gymBrandId: currentGymBrand.id,
        locationId: currentLocation.id,
      })
        .then(async ({data}) => {
          await dispatch(setStatistics(data))
          setNoData(false)
        })
    } else {
      dispatch(setStatistics(null))
      setNoData(true)
    }
  }, [currentGymBrand.id, currentLocation.id])

  const formPlotData = (obj) => {
    const months = {
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "June",
      "7": "July",
      "8": "Aug",
      "9": "Sept",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }

    let data = []

    for (const key in obj) {
      const p = obj[key] + Math.floor(Math.random() * 8)
      data.push({
        name: months[key],
        pv: obj[key],
        amt: 2000
      })
    }
    return data
  }

  return (
    <>
      {noData && (
        <p>Not enough data</p>
      )}
      {statistics?.gymBrandId && !noData && (
        <div>

          <p>Count of activities in location: {statistics.locationCountOfActivities}</p>
          <p>Count of activities in brand: {statistics.gymBrandCountOfActivities}</p>
          <br/>
          <p>Count of appointments in location: {statistics.locationCountOfAppointments}</p>
          <p>Count of appointments in brand: {statistics.gymBrandCountOfAppointments}</p>
          <br/>
          <p>Count of clients in location: {statistics.locationCountOfClients}</p>
          <p>Count of clients in brand: {statistics.gymBrandCountOfClients}</p>
          <br/>
          <p>Count of employees in location: {statistics.locationCountOfEmployees}</p>
          <p>Count of employees in brand: {statistics.gymBrandCountOfEmployees}</p>
          <br/>
          <p>Count of rooms in location: {statistics.locationCountOfRooms}</p>
          <p>Count of rooms in brand: {statistics.gymBrandCountOfRooms}</p>
          <br/>
          <p>Count of added medical cards in location: {statistics.locationCountOfClientsAddedMedicalCards}</p>
          <p>Count of added medical cards in brand: {statistics.gymBrandCountOfClientsAddedMedicalCards}</p>
          <br/>
          <p>Count of disabled clients in location: {statistics.locationCountOfDisabledClients}</p>
          <p>Count of disabled clients in brand: {statistics.gymBrandCountOfDisabledClients}</p>
          <br/>
          <br/>
          <p>Count of new appointments (last 30 days) in location: {statistics.newLocationCountOfAppointments}</p>
          <p>Count of new appointments (last 30 days) in brand: {statistics.newGymBrandCountOfAppointments}</p>
          <br/>
          <p>Count of new clients (last 30 days) in location: {statistics.newLocationCountOfClients}</p>
          <p>Count of new clients (last 30 days) in brand: {statistics.newGymBrandCountOfClients}</p>
          <br/>
          <p>Count of new added medical cards (last 30 days) in location: {statistics.newLocationCountOfClientsAddedMedicalCards}</p>
          <p>Count of new added medical cards (last 30 days) in brand: {statistics.newGymBrandCountOfClientsAddedMedicalCards}</p>
          <br/>
          <p>Count of new disabled clients (last 30 days) in location: {statistics.newLocationCountOfDisabledClients}</p>
          <p>Count of new disabled clients (last 30 days) in brand: {statistics.newGymBrandCountOfDisabledClients}</p>
          <br/>
          <br/>
          <p>Average annual appointments in location: {statistics.locationAverageYearAppointments}</p>
          <p>Average annual clients in location: {statistics.locationAverageYearClients}</p>
          <p>Average annual added medical cards in location: {statistics.locationAverageYearClientsAddedMedical}</p>
          <p>Average annual disabled clients in location: {statistics.locationAverageYearDisabledClients}</p>
          <br/>
          <p>Average annual appointments in brand: {statistics.gymBrandAverageYearAppointments}</p>
          <p>Average annual clients in brand: {statistics.gymBrandAverageYearClients}</p>
          <p>Average annual added medical cards in brand: {statistics.gymBrandAverageYearClientsAddedMedical}</p>
          <p>Average annual disabled clients in brand: {statistics.gymBrandAverageYearDisabledClients}</p>
          <br/>
          <br/>
          <p>Clients who visited the location more than once: {statistics.locationCountOfClientsVisitedMoreOneTime}</p>
          <p>Clients who visited the brand more than once: {statistics.gymBrandCountOfClientsVisitedMoreOneTime}</p>

          <br/>
          <h3>Location average appointments</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.locationAverageAppointments)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Location average clients</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.locationAverageClients)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Location average medical cards</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.locationAverageClientsAddedMedicalCards)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Location average disabled clients</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.locationAverageDisabledClients)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Brand average appointments</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.gymBrandAverageAppointments)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Brand average clients</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.gymBrandAverageClients)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Brand average medical cards</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.gymBrandAverageClientsAddedMedicalCards)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>

          <br/>
          <h3>Brand average disabled clients</h3>
          <LineChart
            width={800}
            height={500}
            data={formPlotData(statistics.gymBrandAverageDisabledClients)}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 4}}/>
          </LineChart>
        </div>
      )}
    </>
  )
}