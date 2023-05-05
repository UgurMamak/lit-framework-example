
import { LitElement, html } from 'lit';

if (process.env.NODE_ENV !== 'production') {
	require('./index.html');
}


 
import './components/web-components/index';

class Content extends LitElement{
	render(){
		return html `
		`;
	}
}


customElements.define('pz-content',Content);