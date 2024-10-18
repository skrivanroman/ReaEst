import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'

const SignIn = () => {
	useEffect(() => {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				clientId: '770073812767-m2bn3m478h9qfshj748mt23dgg4a07p1.apps.googleusercontent.com',
			})
		})
	}, [])
	const [formData, setFormData] = useState({ userName: '', password: '' })
	const router = useRouter()

	const updateInput = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}
	const loginUser = async (event) => {
		event.preventDefault()

		const response = await fetch('http://localhost:3001/api/login', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.text()
		console.log(data)
		if (data === 'login sucess') router.push('/dashboard-home')
	}
	return (
		<form className="form-style1" onSubmit={loginUser}>
			<div className="mb25">
				<label className="form-label fw600 dark-color">Email</label>
				<input
					type="email"
					name="userName"
					className="form-control"
					placeholder="Enter Email"
					onChange={updateInput}
					required
				/>
			</div>
			{/* End email */}

			<div className="mb15">
				<label className="form-label fw600 dark-color">Password</label>
				<input
					type="text"
					name="password"
					className="form-control"
					placeholder="Enter Password"
					onChange={updateInput}
					required
				/>
			</div>
			{/* End Password */}

			<div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
				<label className="custom_checkbox fz14 ff-heading">
					Remember me
					<input type="checkbox" defaultChecked="checked" />
					<span className="checkmark" />
				</label>
				<a className="fz14 ff-heading" href="#">
					Lost your password?
				</a>
			</div>
			{/* End  Lost your password? */}

			<div className="d-grid mb20">
				<button className="ud-btn btn-thm" type="submit">
					Sign in <i className="fal fa-arrow-right-long" />
				</button>
			</div>
			{/* End submit */}

			<div className="hr_content mb20">
				<hr />
				<span className="hr_top_text">OR</span>
			</div>

			<div className="d-grid mb10">
				<GoogleLogin
					clientId="770073812767-m2bn3m478h9qfshj748mt23dgg4a07p1.apps.googleusercontent.com"
					render={(renderProps) => (
						<button
							className="ud-btn btn-white"
							type="button"
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
						>
							<i className="fab fa-google" /> Continue Google
						</button>
					)}
					onSuccess={(credentialResponse) => {
						console.log('success')
						console.log(credentialResponse)
						router.push('/dashboard-home')
					}}
					onError={() => {
						console.log('Login Failed')
					}}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
			<GoogleLogout
				clientId="770073812767-m2bn3m478h9qfshj748mt23dgg4a07p1.apps.googleusercontent.com"
				buttonText="Logout"
				onLogoutSuccess={() => {
					console.log('loged out')
				}}
			></GoogleLogout>
			<div className="d-grid mb10">
				<button className="ud-btn btn-fb" type="button">
					<i className="fab fa-facebook-f" /> Continue Facebook
				</button>
			</div>
			<div className="d-grid mb20">
				<button className="ud-btn btn-apple" type="button">
					<i className="fab fa-apple" /> Continue Apple
				</button>
			</div>
			<p className="dark-color text-center mb0 mt10">
				Not signed up?{' '}
				<Link className="dark-color fw600" href="/register">
					Create an account.
				</Link>
			</p>
		</form>
	)
}

export default SignIn
