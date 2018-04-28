import React from 'react';
import { Well, Span } from 'react-bootstrap';
import Styles from '../../style.css';

class Footer extends React.Component {
	render() {
		return (
			<div>
				<Well bsSize="small" className="footer navbar-fixed-bottom">
					<span>© 2018 All Rights Reserved</span>
					<span className="pull-right">
						<a
							href="https://play.google.com/store/apps/details?id=com.kitscholarship"
							target="_blank"
							style={{ textDecoration: 'none' }}>
							<i class="fab fa-android" style={{ color: '#6dbc8f' }} />&nbsp;Download
							Android App
						</a>
					</span>
				</Well>
			</div>
		);
	}
}

export default Footer;
