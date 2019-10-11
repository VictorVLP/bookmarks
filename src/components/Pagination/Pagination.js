import React from 'react'

const Pagination = ({itemPerPage, totalItems, loadPage}) => {
	const pageNumbers = [];

	//Calcul des numéros de page selon le nombre d'item souhaités
	for(let i = 1 ; i <= Math.ceil(totalItems / itemPerPage) ; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="pagination">
			{pageNumbers.map(number =>(
					<button className={ '.active'+ loadPage} key={number} onClick={() => loadPage(number)}>{number}</button>
			))}
		</nav>
	)
}

export default Pagination;