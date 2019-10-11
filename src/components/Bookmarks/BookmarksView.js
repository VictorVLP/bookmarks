import React, {Component} from "react";

import bookmarksData from "../../datas/bookmarksData.js";
import keywordsData from "../../datas/keywordsData.js";

import BookmarksItem from "./BookmarksItem.js";

import Pagination from "../Pagination/Pagination.js";


import getVimeoApiData from "../../services/vimeoData.services.js";
import getFlickrApiData from "../../services/flickrData.services.js";


class BookmarksView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: [],
            current_page: 1,
            bookmarks_per_page: 5,
            nb_bookmarks: 0,
            value: '',
            valueOnModify: '',
            keywords: []
        }

        // Functions Biding
        this.handleChangeModify = this.handleChangeModify.bind(this);
        this.handleChangeInputAdd = this.handleChangeInputAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.addBookmarks = this.addBookmarks.bind(this);
        this.modifyBookmarks = this.modifyBookmarks.bind(this);
        this.updateKeywordsUrl = this.updateKeywordsUrl.bind(this);

}
    
    /*** 
       Enregistrement et écoute des données dans le localStorage du navigateur
    ***/
    componentDidMount(){
       if(!localStorage.getItem('bookmarks')){
        this.setState({
              bookmarks: bookmarksData,
              nb_bookmarks: bookmarksData.length,
         });
       }else{
            console.log('Using Data Storage for Bookmarks');
       }
    }

    componentWillMount(){
        if(localStorage.getItem('bookmarks')){
            const localBookmark = JSON.parse(localStorage.getItem('bookmarks'));
            this.setState({
                  bookmarks: localBookmark,
                  nb_bookmarks: localBookmark.length,
             });
        }

    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('bookmarks', JSON.stringify(nextState.bookmarks));
    }

    /*** 
       Handlers
    ***/

    handleChangeModify(event) {
        this.setState({valueOnModify: event.target.value});
        this.state.valueOnModify = event.target.value;
    }

    handleChangeInputAdd(event) {
        this.setState({value: event.target.value});
    }

    handleDelete(event){
        //Suppression du bookmarks ayant l'url correspondant
        const bookmarks = this.state.bookmarks.filter(bookmarks => bookmarks.url !== event);

        //Mise à jour de l'état
        this.setState({ bookmarks: bookmarks,  nb_bookmarks: bookmarks.length });
    }
    
    /**
    Fonction d'ajout d'un Bookmarks
    **/
    addBookmarks(event){
        event.preventDefault();

        //Récupération d'un URL Vimeo
        if(this.state.value.includes('vimeo'))
        {
            getVimeoApiData(this.state.value).then(
                ((result) => {
                    this.state.bookmarks.some(bookmarks => bookmarks.url === result.url)
                    ?
                    alert('Cette vidéo existe déjà')
                    :
                    this.state.bookmarks.push(result)
                    ;
                    
                    this.setState({
                        nb_bookmarks: this.state.bookmarks.length,
                        value: ''
                    })  
                })
            );

        //Récupération d'un URL Flickr 
        }else if(this.state.value.includes('flickr'))
        {
            getFlickrApiData(this.state.value).then(
                ((result) => {
                    this.state.bookmarks.some(bookmarks => bookmarks.url === result.url)
                    ?
                    alert('Cette photo existe déjà')
                    :
                    this.state.bookmarks.push(result)
                    ;
                    
                    this.setState({
                        nb_bookmarks: this.state.bookmarks.length,
                        value: ''
                    })  
                })
            );

        //Récupération d'un autre URL
        }else{
            alert('Veuillez entrer un URL valide');
            this.setState({
                value: ''
            })  
        }
    }

    /**
        Fonction de modification des Bookmarks
    **/

    modifyBookmarks(url){

        //Modification d'une video Vimeo
        if(this.state.valueOnModify.includes('vimeo'))
        {
            getVimeoApiData(this.state.valueOnModify).then(
                ((result) => {
                    if(this.state.bookmarks.some(bookmarks => bookmarks.url === result.url))
                    {
                        alert('Cette vidéo existe déjà');
                    }else{

                        this.updateKeywordsUrl(url, this.state.valueOnModify)
                        this.state.bookmarks.splice(this.state.bookmarks.findIndex(bookmarks => bookmarks.url === url), 1, result)   
                    }
                    
                    this.setState({
                        valueOnModify: ''
                    })  
                })
            );

        //Modification d'une photo Flickr        
        }else if(this.state.valueOnModify.includes('flickr'))
        {
            getFlickrApiData(this.state.valueOnModify).then(
                ((result) => {
                    if(this.state.bookmarks.some(bookmarks => bookmarks.url === result.url))
                    {
                        alert('Cette photo existe déjà');
                    }else{
                        this.updateKeywordsUrl(url, this.state.valueOnModify)
                        this.state.bookmarks.splice(this.state.bookmarks.findIndex(bookmarks => bookmarks.url === url), 1, result)   
                    }
                    
                    this.setState({
                        valueOnModify: ''
                    })  
                })
            );

        //Récupération d'un autre URL
        }else{
            alert('Veuillez entrer un URL valide');
            this.setState({
                valueOnModify: ''
            })  
        }
    }

    /**
        Fonction de mise à jour de l'URL d'un keywords
        par un nouvel URL
    **/

    updateKeywordsUrl(url, newUrl){
        const localKeywords = JSON.parse(localStorage.getItem('keywords'));
        localKeywords.forEach( keywords => {
            if(keywords.url === url){
                 keywords.url =  newUrl;
            } 
        }, localKeywords);  
        localStorage.setItem('keywords',JSON.stringify(localKeywords));
    }

    render() {

        //Récupération du numéro de Pagination 
        const indexOfLastBookmarks = this.state.current_page * this.state.bookmarks_per_page;
        const indexOfFirstBookmarks = indexOfLastBookmarks - this.state.bookmarks_per_page;
        const currentBookmarks = this.state.bookmarks.slice(indexOfFirstBookmarks,indexOfLastBookmarks);
        
        const paginate = ((pageNumber) => {
            this.setState({current_page: pageNumber})
        });
        
        //Récupération des Bookmarks
        const bookmarksComponents = currentBookmarks.map(bookmarks => {
            return (
                <BookmarksItem
                    bookmarks={bookmarks} 
                    key={bookmarks.url}
                    handleChangeModify={this.handleChangeModify}
                    modifyBookmarks={this.modifyBookmarks}
                    valueOnModify= {this.state.valueOnModify}
                    handleDelete={this.handleDelete}
                />
            )
        })

        
        return (
            <div className="bookmarks-list">
                <table>
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Date d'ajout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarksComponents}
                    </tbody>
                </table>

                <Pagination 
                    itemPerPage={this.state.bookmarks_per_page} 
                    totalItems={this.state.nb_bookmarks} 
                    loadPage={paginate}
                />

                <form onSubmit={this.addBookmarks}>
                    <input type="url" value={this.state.value} name='url' onChange={this.handleChangeInputAdd} placeholder="URL photo ou video" required/>
                    <input type="submit" value="Ajouter"/>
                 </form>
            </div>
        )
    }
}


export default BookmarksView