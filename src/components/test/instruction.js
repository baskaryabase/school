import React from 'react';
import { Panel, Button, Col } from 'react-bootstrap';
import Styles from '../../style.css';
import { Link } from 'react-router';

class Instruction extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Panel bsStyle="primary" className="instructionpanel">
						<Panel.Heading>
							<Panel.Title componentClass="h3" style={{ fontWeight: '900' }}>
								INSTRUCTIONS
							</Panel.Title>
						</Panel.Heading>
						<Panel.Body>
							<div style={{ fontSize: '20px' }}>
								<p>
									<i className="fas fa-star" />
									&nbsp; Before beginning the exam, Make sure you have a good
									internet connection.
								</p>
								<p>
									<i className="fas fa-star" />&nbsp;Exams must be conducted
									only once.
								</p>
								<p>
									<i className="fas fa-star" />&nbsp;If you are having any query
									with the exams ,consult the superiors.
								</p>
								<p>
									<i className="fas fa-star " />&nbsp;You can only submit the
									answers by clicking the submit button given below.
								</p>

								<p>
									<i className="fas fa-star " />&nbsp; If you encounter problems
									accessing or submitting your exam, you must contact your
									instructor immediately by phone.
								</p>
								<p>
									<i className="fas fa-star " />&nbsp;The exam must be completed
									in one sitting. You can only open it once.
								</p>
								<p>
									<i className="fas fa-star" />&nbsp;Click the “Submit” button
									to submit your exam.
								</p>
								<p>
									<i className="fas fa-star " />&nbsp;To attend the test click
									the proceed button given below.
								</p>
								<p>
									<i className="fas fa-star " />&nbsp;Do not copy the answers
									fron neighbours.
								</p>
								<p>
									<i className="fas fa-star " />&nbsp;~~~~~~~~~~All The
									Best~~~~~~~~~~
								</p>
							</div>
							<Col lg={4} />
							<Col lg={4}>
								<Link
									to="/test"
									style={{ textDecoration: 'none', color: '#fff' }}>
									<Button
										bsStyle="primary"
										style={{
											fontWeight: '900',
											alignSelf: 'center',
											fontSize: '17px'
										}}
										className="pull-center col-lg-12">
										<i className="fas fa-pencil-alt" />&nbsp;Click Here To
										Proceed Test
									</Button>
								</Link>
							</Col>
							<Col lg={4} />
						</Panel.Body>
					</Panel>
				</div>
			</div>
		);
	}
}

export default Instruction;
