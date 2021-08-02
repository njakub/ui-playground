// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *

  const response = await fetch(
    "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJryatWDiwEmsR5sdjBMNMhzs&key="
    // {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "no-cors",
    //   headers: {
    //     // "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // }
  )
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}

export { postData };
