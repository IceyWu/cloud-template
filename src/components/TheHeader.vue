<script setup lang="ts">
import { Languages, Moon, Sun } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getRoutes } from "@/plugins/router";

const { t } = useI18n();

const routes = getRoutes()
  .filter((r) => !r.path.includes("notFound"))
  .map((r) => {
    let { path, name } = r;
    if (path === "/") {
      return { path, name: "Home" };
    }
    if (!name) {
      name = path;
    }
    const nameVal = name.toString().slice(1).replaceAll("/", " · ");
    return { path, name: nameVal };
  });

const { availableLocales, locale } = useI18n();
const isDark = useDark();
</script>

<template>
	<TooltipProvider>
		<div
			class="px-6 md:px-10 border-b border-border/40 bg-background/80 flex h-14 w-full items-center box-border top-0 sticky z-50 backdrop-blur-md"
		>
			<div
				v-motion-roll-bottom
				:initial="{ opacity: 0, y: 100 }"
				:enter="{ opacity: 1, y: 0, scale: 1 }"
				:variants="{ custom: { scale: 2 } }"
				:hovered="{ scale: 1.05 }"
				class="text-2xl font-bold flex items-center cursor-pointer"
			>
				<div class="ml-0 h-auto w-40">
					<Logo />
				</div>
			</div>

			<div class="flex-1" />

			<div class="flex h-full items-center gap-1">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger class="h-9 px-3">
								<Languages class="w-4 h-4" />
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul class="p-2 w-[160px]">
									<li v-for="availableLocale of availableLocales" :key="availableLocale">
										<NavigationMenuLink as-child>
											<a
												:class="[
													'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
													locale === availableLocale
														? 'bg-accent text-accent-foreground font-medium'
														: 'hover:bg-accent/50'
												]"
												@click="locale = availableLocale"
											>
												<span class="w-2 h-2 rounded-full" :class="locale === availableLocale ? 'bg-primary' : 'bg-muted-foreground/30'" />
												{{ availableLocale }}
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

				<Separator orientation="vertical" class="mx-2 h-6" />

				<Tooltip>
					<TooltipTrigger as-child>
						<Button variant="ghost" size="icon" class="h-9 w-9" as="a" href="https://github.com/IceyWu" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
								<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
							</svg>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>GitHub</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger as-child>
						<Button variant="ghost" size="icon" class="h-9 w-9" @click="toggleDark()">
							<Sun v-if="isDark" class="h-4 w-4" />
							<Moon v-else class="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{{ isDark ? '切换亮色模式' : '切换暗色模式' }}</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	</TooltipProvider>
</template>
