import { StaticQuery } from "gatsby"
import React from "react"
import Hero from "../components/hero"
import MainLayout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        console.log(data)
        //const { hero, introsection, productShowcase:showcase } = data.file
        return (
          <MainLayout>
            <SEO title="NAYA" />
            <Hero
              hasText={true}
              desktopImage={data.file}
              title="Litt rydding, kommer mer snart!"
              fullHeight
            /> {/* 
             <IntroSection
              title={introsection.introtitle}
              description={introsection.introdescription}
              image={introsection.introImage.localFile}
            />
           <ProductCarousel title={showcase.ptitle} description={showcase.pdescription} items={showcase.products}/>
            <RecentPosts /> */}
          </MainLayout>
        )
      }}
    />
  )
}

export default IndexPage

const query = graphql`
  query {
    file(name: { eq: "header_home_desktop" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
/*
 const query = graphql`
  query IndexQuery {
    wpPage(title: { eq: "Home" }) {
      title
      hero {
        herotitle
        heroimagemobile {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        heroimagedesktop {
          localFile {
            childImageSharp {
              fluid(maxWidth: 2400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      introsection {
        introtitle
        introdescription
        introImage {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      productShowcase {
        pdescription
        ptitle
        products {
          ... on WpMediaItem {
            id
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
` */
