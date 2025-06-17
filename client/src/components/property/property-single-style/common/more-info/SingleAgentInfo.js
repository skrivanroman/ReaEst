import React from 'react'
import Image from 'next/image'

const SingleAgentInfo = ({ data }) => {
	const agentData = {
		id: 1,
		name: `${data.firstName} ${data.lastName}`,
		phoneNumbers: [data.phone],
		socialMedia: ['facebook', 'twitter', 'instagram', 'linkedin'],
	}

	const profileImage = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.profilePicturePath}`
	return (
		<div className="agent-single d-sm-flex align-items-center bdrb1 mb30 pb25">
			<div className="single-img mb30-sm">
				<Image width={90} height={90} className="w90" src={profileImage} alt="agent" />
			</div>
			<div className="single-contant ml30 ml0-xs">
				<h6 className="title mb-1">{agentData.name}</h6>
				<div className="agent-meta mb10 d-md-flex align-items-center">
					{agentData.phoneNumbers.map((phoneNumber, index) => (
						<a key={index} className="text fz15 pe-2 bdrr1" href="#">
							<i className="flaticon-call pe-1 ps-1" />
							{phoneNumber}
						</a>
					))}
					<a className="text fz15 ps-2" href="#">
						<i className="flaticon-whatsapp pe-1" />
						WhatsApp
					</a>
				</div>
				<div className="agent-social">
					{agentData.socialMedia.map((social, index) => (
						<a key={index} className="mr20" href="#">
							<i className={`fab fa-${social}`} />
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default SingleAgentInfo
