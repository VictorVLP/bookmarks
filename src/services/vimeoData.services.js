import {Video} from "../components/Bookmarks/Bookmarks.js";

const getVimeoApiData = (url) =>{

        let id = url.split("/");
        id = id[id.length-1];

        return fetch("http://vimeo.com/api/v2/video/"+id+".json")
              .then(response => response.json())
              .then((jsonData) => {
                const video = new Video(
                    jsonData[0].url, 
                    jsonData[0].title, 
                    jsonData[0].user_name, 
                    jsonData[0].upload_date, 
                    jsonData[0].height, 
                    jsonData[0].width, 
                    jsonData[0].duration
                );
                return video;
              })
              .catch((error) => {
                console.error(error)
              });
    }
export default getVimeoApiData;
