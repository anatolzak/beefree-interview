# Drone CRUD App
This project is based on create-react-app and can be installed via `npm install` and started with `npm start`.

The project's requirements were to create 3 pages:
1. Drones list page
2. Create drone page
3. Drone detail page

An API was provided for fetching all drones and for fetching the full details of a single drone.

One of the requirements was that creating a drone should persist in the browser storage without sending any API request.

Also, the responses from the API are static and should be cached locally to improve consecutive page load times.

## Challenges

One of the challenges of this project is the lack of a single source of truth for the drones. This is because the API provides a list of drones but newly created drones are stored locally without any API interaction. 

This results in 2 separate data sources: API-fetched drones and locally created drones.

To avoid interacting with 2 separate data sources, I implemented a single source of truth. Since the responses from the API are static, I decided to store the responses in local storage and not refetch the same request on consecutive page loads. 

Then, when creating a new drone, I can directly modify the list of drones stored in local storage and append the newly created drone. This ensures the new drone appears on the drones list page, as this page retrieves its data from local storage, bypassing the API if the data was previously fetched and stored.

One caveat is that we must fetch the list of drones from the API and store them locally before the user creates a new drone. Otherwise when the user creates a new drone, we will modify the list of drones stored locally, and when navigating to the drones list page, we will not initiate a request to the API because we "already had the data locally" and the only drones that will show up on the page, are the drones that were created locally.

The only way this could fail is if the user manages to create a drone before the request to fetch all the drones completes. This is probably unlikely.
