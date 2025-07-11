<script setup lang="ts">
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { getRoutes } from '@/plugins/router'

const { t } = useI18n()

const routes = getRoutes()
	.filter(r => !r.path.includes('notFound'))
	.map((r) => {
		let { path, name } = r
		if (path === '/') {
			return { path, name: 'Home' }
		}

		if (!name) {
			name = path
		}
		const nameVal = name.toString().slice(1).replaceAll('/', ' · ')
		return { path, name: nameVal }
	})

const { availableLocales, locale } = useI18n()
</script>

<template>
	<div
		class="px-[40px] border-b border-gray-200 bg-background/55 flex h-[55px] w-full items-center box-border top-0 sticky z-50 backdrop-blur -mb-px lg:mb-0 lg:border-0 dark:border-gray-800"
	>
		<div
			v-motion-roll-bottom
			:initial="{ opacity: 0, y: 100 }"
			:enter="{ opacity: 1, y: 0, scale: 1 }"
			:variants="{ custom: { scale: 2 } }"
			:hovered="{ scale: 1.2 }"
			text="2xl"
			font-bold flex items-center
		>
			<div ml-0 h-auto w-40>
				<Logo />
			</div>
		</div>
		<div flex-1 />
		<div class="flex h-full items-center z-99 space-x-5">
			<!-- router list -->
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							<i class="i-carbon-ibm-watson-language-translator" />
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul
								class="p-4 gap-3 grid w-[180px] md:grid-cols-1"
							>
								<li
v-for="availableLocale of availableLocales"
								:key="availableLocale"
>
									<NavigationMenuLink as-child>
										<a
										:class="
							locale === availableLocale
								? 'bg-accent  text-accent-foreground'
								: ''
						"
											class="leading-none p-3 outline-none rounded-md no-underline block select-none transition-colors focus:text-accent-foreground hover:text-accent-foreground focus:bg-accent hover:bg-accent space-y-1"
										>
											<div class="text-sm leading-none font-medium" @click="locale = availableLocale">
												{{ availableLocale }}
											</div>

										</a>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem v-for="r of routes" :key="r.path">
						<RouterLink :to="r.path" :class="navigationMenuTriggerStyle()">
							{{ t(r.name) }}
						</RouterLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<a
				icon-btn
				rel="noreferrer"
				href="https://github.com/IceyWu"
				target="_blank"
				title="GitHub"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<mask id="lineMdGithubLoop0" width="24" height="24" x="0" y="0">
						<g fill="#fff">
							<ellipse cx="9.5" cy="9" rx="1.5" ry="1" />
							<ellipse cx="14.5" cy="9" rx="1.5" ry="1" />
						</g>
					</mask>
					<g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path
							stroke-dasharray="30"
							stroke-dashoffset="30"
							d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21"
						>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								dur="0.15s"
								values="30;0"
							/>
						</path>
						<path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19">
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								begin="0.7s"
								dur="0.05s"
								values="10;0"
							/>
							<animate
								attributeName="d"
								dur="1.5s"
								repeatCount="indefinite"
								values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"
							/>
						</path>
					</g>
					<rect
						width="8"
						height="4"
						x="8"
						y="11"
						fill="currentColor"
						mask="url(#lineMdGithubLoop0)"
					>
						<animate
							attributeName="y"
							dur="2.5s"
							keyTimes="0;0.45;0.46;0.54;0.55;1"
							repeatCount="indefinite"
							values="11;11;7;7;11;11"
						/>
					</rect></svg></a>

			<div

				i-carbon-sun
				dark:i-carbon-moon
				icon-btn
				ml-5
				title="Change Theme"
				@click="toggleDark()"
			/>
		</div>
	</div>
</template>
