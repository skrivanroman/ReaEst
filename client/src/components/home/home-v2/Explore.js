import Image from 'next/image'

const Explore = () => {
	// Array of iconbox data
	const iconboxData = [
		{
			icon: '/images/icon/property-buy-2.svg',
			title: 'Koupit',
			text: '',
			linkText: 'Prohlédnout nabídky',
		},
		{
			icon: '/images/icon/property-sell-2.svg',
			title: 'Pronajmout',
			text: '',
			linkText: 'Přidat inzerát',
		},
		{
			icon: '/images/icon/property-rent-2.svg',
			title: 'Prodat',
			text: '',
			linkText: 'Prohlédnout nabídky',
		},
	]

	return (
		<>
			{iconboxData.map((item, index) => (
				<div
					className="col-sm-6 col-lg-4"
					key={index}
					data-aos="fade-up"
					data-aos-delay={(index + 1) * 100} // Increase delay for each item
				>
					<div className="iconbox-style3 text-center">
						<div className="icon">
							<Image width={316} height={150} src={item.icon} alt="icon" />
						</div>
						<div className="iconbox-content">
							<h4 className="title">{item.title}</h4>
							<p className="text">{item.text}</p>
							<a href="#" className="ud-btn btn-thm3">
								{item.linkText}
								<i className="fal fa-arrow-right-long" />
							</a>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default Explore
