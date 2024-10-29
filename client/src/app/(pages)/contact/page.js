import CallToActions from '@/components/common/CallToActions'
import DefaultHeader from '@/components/common/DefaultHeader'
import Footer from '@/components/common/default-footer'
import MobileMenu from '@/components/common/mobile-menu'
import Form from '@/components/pages/contact/Form'
import Office from '@/components/pages/contact/Office'
import Header from '@/components/home/home-v2/Header'
import Social from '@/components/common/default-footer/Social'

export const metadata = {
	title: 'Contact  || Homez - Real Estate NextJS Template',
}

const Contact = () => {
	return (
		<>
			{/* Main Header Nav */}
			<DefaultHeader />
			{/* End Main Header Nav */}

			{/* Mobile Nav  */}
			<MobileMenu />
			{/* End Mobile Nav  */}

			{/* Our Contact With Map */}
			<section className="p-0">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1140.4016616497468!2d14.412920616618319!3d50.08413186260736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94ef9caf4e71%3A0xd0d57c311176e20d!2zS2Fyb2xpbnkgU3bEm3Rsw6kgMjc4LzI4LCAxMTAgMDAgU3RhcsOpIE3Em3N0bw!5e0!3m2!1sen!2scz!4v1730214552931!5m2!1sen!2scz"
					width="600"
					height="450"
					loading="lazy"
					className="home8-map contact-page"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
				{/*				<iframe
					className="home8-map contact-page"
					loading="lazy"
					src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=14&output=embed&iwloc=near"
					title="London Eye, London, United Kingdom"
					aria-label="London Eye, London, United Kingdom"
				/>*/}
			</section>
			{/* End Our Contact With Map */}

			{/* Start Our Contact Form */}
			<section>
				<div className="container">
					<div className="row d-flex align-items-end">
						<div className="col-lg-5 position-relative">
							<div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
								<h4 className="form-title mb25">Máte dotaz? / Chcete si doumluvit schůzku?</h4>
								<Form />
							</div>
						</div>
						{/* End .col */}

						<div className="col-lg-5 offset-lg-2">
							<h2 className="mb30">
								Budeme rádi, když se nám ozvete. <br className="d-none d-lg-block" /> <br className="" />
								Rádi vám se vším pomůžeme.
							</h2>
							<p className="text">
								Máte otázky ohledně prodeje nemovitosti nebo potřebujete poradit s jednotlivými kroky procesu? Naši
								zkušení specialisté jsou připraveni vám poskytnout veškeré potřebné informace a podporu, aby byl váš
								prodej rychlý, efektivní a bez zbytečných komplikací.
							</p>
						</div>
						{/* End .col */}
					</div>
				</div>
			</section>
			{/* End Our Contact Form */}

			{/* Visit our Office */}
			<section className="pt0 pb90 pb10-md">
				<div className="container">
					<CallToActions />
					<div className="row">
						<div className="col-lg-6 m-auto" data-aos="fade-up" data-aos-delay="300">
							<div className="main-title text-center">
								<h2 className="title">Sledujte nás na sociálních sítích</h2>
							</div>
						</div>
					</div>
					{/* End .row */}

					<div className="row" data-aos="fade-up" data-aos-delay="100">
						<Office />
					</div>
					{/* End .row */}
				</div>
			</section>
			{/* End Visit our Office */}

			{/* Our CTA */}
			{/* Our CTA */}

			{/* Start Our Footer */}
			<section className="footer-style1 pt60 pb-0">
				<Footer />
			</section>
			{/* End Our Footer */}
		</>
	)
}

export default Contact
