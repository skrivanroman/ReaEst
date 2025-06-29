'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import useForm from '@/utilis/useForm'
import { useRouter } from 'next/navigation'

const SignUp = () => {
	const [formData, setFormData] = useForm({})
	const passwordCheckRef = useRef(null)
	const router = useRouter()
	useEffect(() => {
		passwordCheckRef.current.style.visibility = 'hidden'
	}, [])
	const register = async (event) => {
		event.preventDefault()
		const { email, password, passwordCheck } = formData

		if (password !== passwordCheck) {
			passwordCheckRef.current.style.visibility = 'visible'
			return
		}
		passwordCheckRef.current.style.visibility = 'hidden'

		const reqBody = { email, password, loginOption: 'password', firstName: 'Luděk', lastName: 'Dronski' }
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (response.ok) {
			router.push('/dashboard-home')
			document.body.classList.remove('modal-open')
			document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove())
			document.body.style.overflow = 'auto'
		} else {
			console.log(response.status)
		}
	}
	return (
		<form className="form-style1" onSubmit={register}>
			<div className="mb25">
				<label className="form-label fw600 dark-color">Email</label>
				<input type="email" name="email" onChange={setFormData} className="form-control" placeholder="Email" required />
			</div>
			{/* End Email */}

			<div className="mb20">
				<label className="form-label fw600 dark-color">Heslo</label>
				<input
					type="password"
					name="password"
					onChange={setFormData}
					className="form-control"
					placeholder="Heslo"
					required
				/>
			</div>
			<div className="mb20">
				<label className="form-label fw600 dark-color">Potvrdit heslo</label>
				<input
					type="password"
					name="passwordCheck"
					onChange={setFormData}
					className="form-control"
					placeholder="Heslo znovu"
					required
				/>
				<p className="fw600 red-color" ref={passwordCheckRef}>
					Hesla se neschodují
				</p>
			</div>
			{/* End Password */}

			<div className="d-grid mb20">
				<button className="ud-btn btn-thm" type="submit">
					Zaregistrovat <i className="fal fa-arrow-right-long" />
				</button>
			</div>
			<div className="hr_content mb20">
				<hr />
				<span className="hr_top_text">Nebo</span>
			</div>

			<div className="d-grid mb10">
				<button className="ud-btn btn-white" type="button">
					<i className="fab fa-google" /> pokračovat přes Google
				</button>
			</div>
			<div className="d-grid mb10">
				<button className="ud-btn btn-fb" type="button">
					<i className="fab fa-facebook-f" /> pokračovat přes Facebook
				</button>
			</div>
			<p className="dark-color text-center mb0 mt10">
				Už máte účet?{' '}
				<Link className="dark-color fw600" href="/login">
					Přihlásit
				</Link>
			</p>
		</form>
	)
}

export default SignUp
