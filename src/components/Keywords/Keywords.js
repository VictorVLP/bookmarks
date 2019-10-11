import React, {Component} from "react";

import KeywordsItem from './KeywordsItem.js';
import keywordsData from "../../datas/keywordsData.js";

class Keywords extends Component {
	constructor(props, keys, url){
		super(props);
		this.url = url;
		this.keys = keys;
		this.state = {
			keywords: [],
			valueKeyOnModify: '',
			valueKey: ''
		}
		this.handleChangeInputKey = this.handleChangeInputKey.bind(this);
		this.handleKeyDelete = this.handleKeyDelete.bind(this);
		this.handleChangeInputAddKey = this.handleChangeInputAddKey.bind(this);
		this.addKeywords = this.addKeywords.bind(this);
	}


    /*** 
       Enregistrement et écoute des données dans le localStorage du navigateur
    ***/

	componentDidMount(){
       if(!localStorage.getItem('keywords')){
        this.setState({
              keywords: keywordsData
         });
       }else{
           // console.log('Using Data Storage for keywords');
       }
    }

    componentWillMount(){
        const localKeywords = JSON.parse(localStorage.getItem('keywords'));

         if(localStorage.getItem('keywords')){
            const localKeywords = JSON.parse(localStorage.getItem('keywords'));

            this.setState({
                      keywords: localKeywords,
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('keywords', JSON.stringify(nextState.keywords));
    }


    /*** 
       Handlers
    ***/

	handleChangeInputAddKey(event){
        this.setState({valueKey: event.target.value});
    }

    handleChangeInputKey(event){
        this.setState({valueKeyOnModify: event.target.value});
    }

    handleKeyDelete(title, url){

        //Suppression du mot clé rattaché à l'url
        this.state.keywords.filter(keywords => {
           return keywords.url === this.props.url
        }).map( keywords => {
            if(keywords.keys.includes(title)){
                keywords.keys.splice(keywords.keys.indexOf(title),1);
            }
        });

        //Mise à jour de l'état
        this.setState({ keywords: this.state.keywords});
    }

    /*** 
        Fonction d'ajout d'un mot clé 
    ***/

    addKeywords(url, newKeywords){
    	if(this.state.keywords.find(keywords => keywords.url === url) === undefined)
    	{
    		this.state.keywords.push(new Keywords('',[newKeywords], url));
    	}else{
	    	this.state.keywords.filter(keywords => {
	           return keywords.url === url
	        })
	        .map( keywords => {
	            if(keywords.keys.includes(newKeywords) === false && newKeywords !== ''){
	               return keywords.keys.push(this.state.valueKey)
	            }else{
	                alert('Veuillez entrer un mot clé non existant');
	            }
	        });
    	}

        this.setState({ keywords: this.state.keywords, valueKey: ''});
    }

	render() {

		//Récupération des mots clés liés à l'URL pour préparer le rendu
		const keywordsComponents = this.state.keywords.filter(keywords => {
           return keywords.url === this.props.url
        }).map( keywords => {
        	return keywords.keys.map( key =>{
	            return (
	                <KeywordsItem 
	                    key={key}
	                    title={key}
	                    handleKeyDelete={this.handleKeyDelete}
	                    url={this.props.url}
	                />
                )
        	}
        	)
        });

	return( 
		<div>
            <p>Mots clés :</p>
            <div className="keywords-container">
			     {keywordsComponents}
            </div>
                <div>
                    <input type="text" value={this.state.valueKey} onChange={this.handleChangeInputAddKey} placeholder="Nouveau mot clé"/>
                    <button onClick={()=> this.addKeywords(this.props.url, this.state.valueKey)}>Ajouter</button>
                </div>
		</div>
		)
	}
}

export default Keywords