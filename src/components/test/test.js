import React from 'react';
import Styles from '../../style.css';
import {
	PanelGroup,
	Panel,
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	Col,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton,
	Alert,
	Navbar
} from 'react-bootstrap';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Redirect } from 'react-router';
import format from 'minutes-seconds-milliseconds';
import Image from '../../img/logo.png';

import {
	getQbank,
	updateAnswer,
	testSubmission
} from '../../actions/qbankAction';

class Test extends React.Component {
	componentWillMount() {
		this.props.getQbank();
	}
	state = { period: null };
	componentDidMount() {
		var time = new Date();
		time.setMinutes(time.getMinutes() + 30);
		setInterval(() => {
			this.setState({ period: time - new Date() });
		}, 30);
	}
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			show: true,
			submitted: false
		};
	}

	handleShow() {
		this.setState({ show: true });
	}
	handleSubmit() {
		let answer = { answers: this.props.answers, _id: this.props.user._id };
		this.props.testSubmission(answer);
		this.setState({ submitted: false });
		this.props.user.started = true;
	}

	render() {
		const questions = this.props.qbank.map((quest, j) => {
			return (
				<div key={j}>
					<Panel bsStyle="primary" className="testpanel">
						<Panel.Body>
							<div style={{ fontSize: '20px' }}>
								<div>
									<b>{j + 1}.</b>
									{quest.question}
									<div className="row-eq-height">
										<ButtonToolbar>
											<ToggleButtonGroup name="options">
												{quest.choices.map((choice, i) => {
													return (
														<ToggleButton
															key={i}
															value={i + 1}
															onClick={() =>
																this.props.updateAnswer({
																	value: choice.value,
																	index: j
																})
															}
															style={{
																whiteSpace: 'normal',
																testalign: 'unset',
																fontWeight: '600'
															}}
															className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
															{choice.label}
														</ToggleButton>
													);
												})}
											</ToggleButtonGroup>
										</ButtonToolbar>
									</div>
								</div>
								<br />
							</div>
						</Panel.Body>
					</Panel>
				</div>
			);
		});
		setInterval(() => {
			if (this.state.period < 500) {
				this.handleSubmit();
			}
		}, 1000);
		if (this.props.user._id != null) {
			return this.props.user.started == false ? (
				<div>
					<div>
						<Navbar id="custom-nav" className="pad">
							<Navbar.Header>
								<Col lg={2} sm={3} md={3} xs={4}>
									<Navbar.Brand>
										<img src={Image} className="logoimg" />
										<Navbar.Link />
									</Navbar.Brand>
								</Col>
								<Col lg={10} sm={9} md={9} xs={8}>
									<Navbar.Text className="kitname">
										<Navbar.Link
											href="http://kitcbe.com/"
											style={{ textDecoration: 'none' }}
											target="_blank">
											Kalaignar Karunanidhi Institute Of Technology
										</Navbar.Link>
									</Navbar.Text>
								</Col>
							</Navbar.Header>
							<div
								className="pull-right"
								style={{
									fontWeight: '900',
									marginTop: '25px',
									fontSize: '16px'
								}}>
								Time Started&nbsp;<i className="fas fa-arrow-right" />&nbsp;
								{format(this.state.period)}
							</div>
						</Navbar>
					</div>

					{questions}
					<div className="container testsubbut">
						<Col lg={3} />
						<Col lg={6}>
							<Button
								style={{
									marginBottom: '70px',
									fontWeight: '900',
									fontSize: '20px',
									marginTop: '5px'
								}}
								onClick={this.handleSubmit.bind(this)}
								className="btn-primary col-lg-8">
								<i className="fas fa-hand-point-right" />&nbsp; Click Here To
								Submit
							</Button>
						</Col>
						<Col lg={3} />
					</div>
				</div>
			) : (
				<Alert className="container">
					<div>
						<p
							style={{
								fontWeight: '900',
								fontSize: '20px',
								textAlign: 'center'
							}}>
							<i className="fas fa-angle-double-right" />&nbsp; You have
							completed the test successfully!!!
						</p>
						<p
							style={{
								fontWeight: '900',
								fontSize: '20px',
								textAlign: 'center'
							}}>
							<i className="fas fa-angle-double-right" /> &nbsp; If you are not
							attended the test inform to the superiors
						</p>
						<Link
							to="/"
							className="btn btn-warning pull-right"
							style={{
								fontWeight: '900',
								fontSize: '17px'
							}}>
							<i className="fas fa-hand-point-right" />&nbsp;Click here to Go
							Back
						</Link>
					</div>
				</Alert>
			);
		} else {
			return (
				<Alert className="container">
					<p
						style={{
							fontWeight: '900',
							fontSize: '20px',
							textAlign: 'center'
						}}>
						<i className="fas fa-angle-double-right" /> You are unauthorized to
						access this page
					</p>
					<br />
					<p
						style={{
							fontWeight: '900',
							fontSize: '20px',
							textAlign: 'center'
						}}>
						<i className="fas fa-angle-double-right" /> please&nbsp;
						<i className="fas fa-sign-in-alt" />&nbsp;login to continue
					</p>
					<br />
					<Link
						to={'/'}
						className="btn btn-warning pull-right"
						style={{
							fontWeight: '900',
							fontSize: '17px'
						}}>
						<i className="fas fa-hand-point-right" /> click here to login
					</Link>
				</Alert>
			);
		}
	}
}
function mapStateToProps(state) {
	return {
		qbank: state.qbank.qbank,
		answers: state.qbank.answers,
		user: state.user.user
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ getQbank, updateAnswer, testSubmission },
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(Test);
