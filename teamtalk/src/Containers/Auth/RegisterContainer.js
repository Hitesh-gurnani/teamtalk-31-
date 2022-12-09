import { Component } from 'react'
import Register from '../../Components/Auth/Register'
import firebase from '../../firebase';
import md5 from 'md5';

class RegisterContainer extends Component {
	state = {
		formData: {
			email: '',
			password: '',
			firstName: '',
			lastName: ''
		},
		loading: false,
		error: null,
		usersRef: firebase.database().ref('users'),
	}
	
	componentDidMount() {
		document.title = "Register"
	}
	isFormValid = () => {
		return (
			this.state.formData.email.length > 0 ||
			this.state.formData.firstName.length > 0 ||
			this.state.formData.lastName.length > 0 ||
			this.state.formData.password.length > 0
		)
	}
	onSubmit = e => {
		
		this.setState({ loading: true })
		let k=this.state.formData.email.indexOf('@');
		var v = this.state.formData.email.slice(k);
		console.log(v)
		if (this.isFormValid && v==="@juetguna.in") {
			alert('Email verification link has been send')
			e.preventDefault();
			firebase
				.auth()
				firebase.auth().onAuthStateChanged(async function(user) {
					await user.sendEmailVerification(); 
					
				});
				firebase.auth().createUserWithEmailAndPassword(this.state.formData.email, this.state.formData.password)
				.then(createdUser => {
					createdUser.user.updateProfile({
						
						displayName: `${this.state.formData.firstName} ${this.state.formData.lastName}`,
						photoURL: `https://www.gravatar.com/avatar/${md5(this.state.formData.email)}?d=identicon`
					})
					.then(() => {
						this.saveCreatedUser(createdUser)
							.then(() => {
								this.setState({ loading: false })
							})
					})

				})
				
				.catch(err => {
					console.log(err);
					this.setState({ loading: false, error: err.message })
				})
		}
		else{
			alert("Please enter g-suite id")
		}

	}
	saveCreatedUser = createdUser => {
		return this.state.usersRef.child(createdUser.user.uid)
			.set({
				name: createdUser.user.displayName,
				avatar: createdUser.user.photoURL
			})
	}


	onValChange = e => {
		const updateForm = {
			...this.state.formData,
			[e.target.name]: e.target.value
		}
		this.setState({ formData: updateForm })
	}
	render() {
		return (
			<Register
				formSubmit={this.onSubmit}
				loading={this.state.loading}
				valChange={this.onValChange}
				error={this.state.error}
				 />
		)
	}
}


export default RegisterContainer;