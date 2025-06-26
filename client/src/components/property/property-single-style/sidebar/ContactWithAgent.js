import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ContactWithAgent = ({ data }) => {
	const profileImage = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.profilePicturePath}`
	return (
		<>
			<div className="agent-single d-sm-flex align-items-center pb25">
				<div className="single-img mb30-sm">
					<Image width={90} height={90} className="w90" src={profileImage} alt="avatar" />
				</div>
				<div className="single-contant ml20 ml0-xs">
					<h6 className="title mb-1">{data.firstName + ' ' + data.lastName}</h6>
					<div className="agent-meta mb10 d-md-flex align-items-center">
						<a className="text fz15" href="#">
							<i className="flaticon-call pe-1" />
							{data.phone}
						</a>
					</div>
					<Link href={`/agent-single/${data.userId}`} className="text-decoration-underline fw600">
						Zobrazit inzeráty
					</Link>
				</div>
			</div>
			{/* End agent-single */}

			<div className="d-grid">
				<Link href="/agent-single/3" className="ud-btn btn-white2">
					Kontaktovat
					<i className="fal fa-arrow-right-long" />
				</Link>
			</div>
		</>
	)
}

export default ContactWithAgent
