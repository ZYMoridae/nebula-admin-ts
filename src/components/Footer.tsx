import * as React from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Theme, createStyles } from "@material-ui/core";

import CatIcon from '../components/icons/Cat';

const styles = (theme: Theme) => createStyles({
	container: {
		backgroundColor: '#232F3E',
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		// marginTop: theme.spacing(8),
		textAlign: 'center'
	},
	footerText: {
		color: 'white',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	footerTextContainer: {
		marginBottom: theme.spacing(1)
	},
	linkContainer: {
		textAlign: 'center',
		display: 'inline-flex',
		color: 'white',
		width: '100%'
	},
	linkItem: {
		marginRight: theme.spacing(2),
		transition: 'all 0.15s',
		color: 'white',
		textDecoration: 'none',
		'&:hover': {
			color: theme.palette.primary.main,
			transition: 'all 0.15s',
			textDecoration: 'underline'
		}
	},
	rootContianer: {
		marginTop: theme.spacing(5),
		// paddingBottom: theme.spacing(4)
	},
	backToTop: {
		backgroundColor: '#37475A',
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		textAlign: 'center',
		transition: 'all .2s',
		'&:hover': {
			backgroundColor: '#516680'
		}
	}
});

type MyState = {
};


type MyProps = {
	classes: any
};

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

class Footer extends React.Component<MyProps, MyState> {

	backToTop() {
		scrollToTop();
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.rootContianer}>
				<div className={classes.backToTop} onClick={this.backToTop}>
					<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
						Back to top
					</Typography>
				</div>
				<div className={classes.container}>
					<div className={classes.footerTextContainer}>
						<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
							<a href='/' className={classes.linkItem}>
								Condition of Use
							</a>
							<a href='/' className={classes.linkItem}>
								Privacy Notice
							</a>
							<a href='/' className={classes.linkItem}>
								Cookies
							</a>
						</Typography>
					</div>
					<div>
						<CatIcon color="white" style={{marginTop: '16px', marginBottom: '16px'}}></CatIcon>
					</div>
					<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
						© 2019, Max Studio
					</Typography>
				</div>
			</div>


		)
	}
}

export default withStyles(styles)(Footer);