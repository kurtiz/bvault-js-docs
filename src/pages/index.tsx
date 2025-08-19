import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner, styles.coffeeGradient)}>
            <div className="container">
                <div className={styles.headerContent}>
                    <img src="/img/bvault-js.svg" alt="bVault-js Logo" height="200"/>
                    <Heading as="h1" className={clsx("hero__title", styles.title)}>
                        {siteConfig.title}
                    </Heading>
                    <p className={clsx("hero__subtitle", styles.subtitle)}>
                        bVault-js is a type-safe, lightweight, zero-dependency cryptographic library for secure
                        encryption and decryption in browser environments.
                    </p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx("button button--primary button--lg", styles.ctaButton)}
                            to="/docs/introduction">
                            🛡️ Get Started
                        </Link>
                        <Link
                            className={clsx("button button--outline button--lg", styles.secondaryButton)}
                            to="https://github.com/kurtiz/bvault-js">
                            ⭐ Star on GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

function CoffeeFeature({title, description, icon}: { title: string; description: string; icon: string }) {
    return (
        <div className={clsx('col col--4', styles.featureCol)}>
            <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                    {icon}
                </div>
                <Heading as="h3" className={styles.featureTitle}>
                    {title}
                </Heading>
                <p className={styles.featureDescription}>{description}</p>
            </div>
        </div>
    );
}

function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    <CoffeeFeature
                        icon="🔒"
                        title="Strong Security"
                        description="AES-GCM encryption with PBKDF2 key derivation. As strong as your morning espresso."
                    />
                    <CoffeeFeature
                        icon="✨"
                        title="Simple API"
                        description="Clean, type-safe, zero-dependency. Like a well-brewed pour-over, no extra bitterness."
                    />
                    <CoffeeFeature
                        icon="⚡"
                        title="Lightweight"
                        description="Optimized for browsers, quick to load. Your code runs as fast as a caffeine rush."
                    />
                </div>
            </div>
        </section>
    );
}

function CoffeeBeansDecoration() {
    return (
        <div className={styles.beansDecoration}>
            {Array.from({length: 15}).map((_, i) => (
                <div key={i} className={styles.coffeeBean}></div>
            ))}
        </div>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title} – Secure Frontend Encryption`}
            description="bVault-js: A type-safe, zero-dependency encryption library for the browser.">
            <HomepageHeader/>
            <main>
                <CoffeeBeansDecoration/>
                <HomepageFeatures/>
                <section className={styles.whySection}>
                    <div className="container">
                        <div className={styles.whyContent}>
                            <Heading as="h2" className={styles.whyTitle}>
                                Why bVault-js?
                            </Heading>
                            <p className={styles.whyDescription}>
                                Just like coffee keeps you energized, <b>bVault-js</b> keeps your
                                data safe and encrypted - without weighing down your frontend.
                            </p>
                            <div className={styles.whyCta}>
                                <Link
                                    className={clsx("button button--primary button--lg", styles.docsButton)}
                                    to="/docs/introduction">
                                    📖 Explore the Docs
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}