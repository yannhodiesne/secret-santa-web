CREATE TABLE `conflicts` (
	`firstId` integer NOT NULL,
	`secondId` integer NOT NULL,
	PRIMARY KEY(`firstId`, `secondId`),
	FOREIGN KEY (`firstId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`secondId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`userId` integer NOT NULL,
	`year` integer NOT NULL,
	`recipientId` integer,
	PRIMARY KEY(`userId`, `year`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipientId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`discordId` text NOT NULL,
	`username` text NOT NULL,
	`avatar` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_discordId_unique` ON `users` (`discordId`);