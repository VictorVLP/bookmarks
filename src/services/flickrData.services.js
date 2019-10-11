import {Photo} from '../components/Bookmarks/Bookmarks.js';

const getFlickrApiData = (url) => {

        const textCut = url.split("/");
        const id = url.includes('http') ? textCut[5] : textCut[3]; 
        const sizeSuffix = url.includes('http') ? textCut[7] : textCut[5]; 

        return fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=ed240cd016c79de75414d52f89eabd9d&photo_id="+id+"&format=json&nojsoncallback=1")
        .then(response => response.json())
              .then((jsonData) => {
                return getSizePhoto(sizeSuffix, id).then(            
                    ((result) => {
                        console.log(jsonData);
                        const response = new Photo(
                            url, 
                            jsonData.photo.title._content, 
                            jsonData.photo.dates.taken, 
                            jsonData.photo.tags.tag[0].authorname, 
                            result.height, 
                            result.width
                        );
                        return response;
                    }) 
                );
              })
              .catch((error) => {
                console.error(error)
              });
    }

const getSizePhoto = (suffix, id) => {

        let label;

        //Définition des différences tailles des images selon les suffix 
        switch (suffix) {
            case 's':
                //Small 
                label = "Small";
            break;
            case 'q':
                //Large Square
                label = "Large Square";
            break;
            case 'sq':
                // Square
                label = "Square";
            break;

            case 't':
                // Thumbnail
                label = "Thumbnail";
            break;
            case 'm':
                // Medium
                label = "Medium";
            break;
            case 'n':
                // Small 320
                label = "Small 320";
            break;
            case 'z':
                // Medium 640
                label = "Medium 640";
            break;
            case 'c':
                //Medium 800
                label = "Medium 800";
            break;
            case 'l':
                //Large
                label = "Large";
            break;
            case 'h':
                //Large 1600
                label = "Large 1600";
            break;
            case 'k':
                //Large 2048
                label = "Large 2048";
            break;
            case 'o':
                //Original
                label = "Original";
            break;
            default:
                label = 'Medium';
        }

        return fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ed240cd016c79de75414d52f89eabd9d&photo_id="+id+"&format=json&nojsoncallback=1")
                .then(response => response.json())
                .then((jsonData) => {
                    const datasize = jsonData.sizes.size;
                    const sizes = datasize.filter(datasize => datasize.label === label);
                return sizes[0];
              })
              .catch((error) => {
                console.error(error)
              });
    }

export default getFlickrApiData;