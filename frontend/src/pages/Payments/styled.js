import styled from 'styled-components'


export const Container = styled.div`
	border: 1px solid;
	margin-top: 10vh;
	margin-bottom: 12vh;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	h3{
		text-align: center;
	}
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
		input[type=date]{
			width: 19vw;
		}
		input{
			background: transparent;
			padding: 5px;
			border-radius: 10px;
		}
	}
	button{
		width: 210px;
		border-radius: 10px;
		cursor: pointer;
		padding: 2px;
		background-image: linear-gradient(gray, whitesmoke);
		margin-bottom: 10px;
	}

`
