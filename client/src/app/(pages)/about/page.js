import CallToActions from '@/components/common/CallToActions'
import DefaultHeader from '@/components/common/DefaultHeader'
import Partner from '@/components/common/Partner'
import Footer from '@/components/common/default-footer'
import MobileMenu from '@/components/common/mobile-menu'
import Agents from '@/components/pages/about/Agents'
import Features from '@/components/pages/about/Features'
import FunFact from '@/components/pages/about/FunFact'
import Mission from '@/components/pages/about/Mission'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
	title: 'About  || Homez - Real Estate NextJS Template',
}

const About = () => {
	return (
		<>
			{/* Main Header Nav */}
			<DefaultHeader />
			{/* End Main Header Nav */}

			{/* Mobile Nav  */}
			<MobileMenu />
			{/* End Mobile Nav  */}

			{/* Breadcrumb Sections */}
			<section className="breadcumb-section2 p-0">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcumb-style1">
								<h2 className="title" style={{ fontSize: '60px' }}>
									O nás
								</h2>
								<div className="breadcumb-list"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Breadcrumb Sections */}

			{/* Our About Area */}
			<section className="our-about pb90">
				<div className="container">
					<div className="row" data-aos="fade-up" data-aos-delay="300">
						<div className="col-lg-6">
							<h2>
								Úvodní část – kdo jsme a co děláme
								<br className="d-none d-lg-block" />
							</h2>
						</div>
						<div className="col-lg-6">
							<p className="text mb25">
								<b>Reaest – vaše spolehlivá cesta k vysněnému domovu</b> <br /> Jsme moderní realitní platforma, která
								propojuje kupující, prodávající a pronajímatele nemovitostí – a usnadňujeme jim cestu k ideálnímu
								domovu, investici či kanceláři. Díky našemu snadnému vyhledávání, profesionálním makléřům a intuitivnímu
								prostředí získáte přehled a kontrolu nad celým procesem.
							</p>
							<h3>Naše poslání a hodnota</h3>
							<p className="text mb55">
								<b>Co je naším cílem?</b>
								<ul>
									<li>• Ulehčit rozhodování při koupi, prodeji či pronájmu nemovitostí</li>
									<li>• Přinášet relevantní a aktuální nabídky z různých lokalit (Praha, Ostrava, Vídeň, Rovinjaj.)</li>
									<li>
										• Budovat důvěryhodné prostředí pro všechny uživatele – ať už jste jedinec, realitní kancelář, nebo
										developer
									</li>
								</ul>
								<b>Jak to děláme?</b>
								<ul>
									<li>• Přesné filtrování podle typu nemovitosti, lokality, ceny i dispozic</li>{' '}
									<li>• Podpora profesionálního servisu makléřů z našeho týmu</li>{' '}
									<li>• Transparentní komunikace i rychlá technická podpora (chat, e‑mail, infolinka)</li>
								</ul>
							</p>
							<div className="row">
								<Mission />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Our About Area */}

			{/* About Banner */}
			<section className="our-about pt-0">
				<div className="container">
					<div className="row" data-aos="fade-up" data-aos-delay="300">
						<div className="col-lg-12">
							<div className="about-page-img">
								<Image
									width={1206}
									height={515}
									priority
									className="w-100 h-100 cover"
									src="/images/about/about-page-banner.jpg"
									alt="about banner"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End About Banner */}

			{/* Funfact */}
			<section className="pt-0">
				<div className="container">
					<div className="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
						<FunFact />
					</div>
				</div>
			</section>
			{/* End Funfact */}

			{/* Exclusive Agents */}
			<section className="pb90">
				<div className="container">
					<div className="row  justify-content-center">
						<div className="col-auto">
							<div className="main-title" data-aos="fade-up" data-aos-delay="100">
								<h2 className="title">Naši experti – makléři a tým</h2>
								<p className="paragraph">
									„Naši makléři, jako například Luděk Dronski a jeho tým, jsou specialisté na lokální trhy a
									individuální přístup. Pomohou s financováním, právními otázkami i samotným procesem prodeje.“
								</p>
							</div>
						</div>
						{/* End header */}
					</div>
					{/* End .row */}

					<div className="row">
						<div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
							<div className="property-city-slider">
								<Agents />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Exclusive Agents */}

			{/* Abut intro */}
			<section className="pt30 pb-0">
				<div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-5 pl30-md pl15-xs" data-aos="fade-left" data-aos-delay="300">
								<div className="mb30">
									<h2 className="title text-capitalize">
										Najdeme pro vás <br className="d-none d-md-block" /> to nejlepší
									</h2>
								</div>
								<div className="why-chose-list style2">
									<Features />
								</div>
								<Link href="#" className="ud-btn btn-dark">
									Více
									<i className="fal fa-arrow-right-long" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Abut intro */}

			{/* Our Partners */}
			<section className="our-partners">
				<div className="container">
					<div className="row">
						<div className="col-lg-12" data-aos="fade-up">
							<div className="main-title text-center">
								<h6>Sponzorují</h6>
							</div>
						</div>
						<div className="col-lg-12 text-center">
							<div className="dots_none nav_none" data-aos="fade-up" data-aos-delay="300">
								<Partner />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Our Partners */}

			{/* Our CTA */}
			<CallToActions />
			{/* Our CTA */}

			{/* Start Our Footer */}
			<section className="footer-style1 pt60 pb-0">
				<Footer />
			</section>
			{/* End Our Footer */}
		</>
	)
}

export default About
