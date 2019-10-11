/***
  Définition des Classes Bookmarks Photo et Vidéo
***/

class Bookmarks {
    constructor(url, title, author_name, added_date) {
        this.url = url;
        this.title = title;
        this.author_name = author_name;
        this.added_date = added_date;
   }
}

class Photo extends Bookmarks {
    constructor(url, title, author_name, added_date, height, width) {
        super(url, title, author_name, added_date);
        this.height = height;
        this.width = width;
    }
}

class Video extends Bookmarks {
    constructor(url, title, author_name, added_date, height, width, duration) {
        super(url, title, author_name, added_date);
        this.height = height;
        this.width = width;
        this.duration = duration;
    }
}
export {
  Bookmarks,
  Photo,
  Video
}