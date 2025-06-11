-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2025 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrms`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `description` text DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT 0.00,
  `location` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `code`, `description`, `manager_id`, `budget`, `location`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Engineering', 'ENG', 'Handles all engineering tasks', 1, 50000.00, 'Block A', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(2, 'Marketing', 'MKT', 'Marketing and advertising', 3, 30000.00, 'Block B', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(3, 'Finance', 'FIN', 'Finance and accounting', NULL, 40000.00, 'Block C', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(4, 'HR', 'HR', 'Human Resources', 2, 25000.00, 'Block D', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(5, 'IT Support', 'IT', 'IT and technical support', NULL, 20000.00, 'Block E', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(6, 'Research', 'RND', 'Research and development', NULL, 35000.00, 'Block F', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(7, 'Administration', 'ADM', 'Administrative tasks', 8, 15000.00, 'Block G', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(8, 'Procurement', 'PRC', 'Procurement and logistics', NULL, 18000.00, 'Block H', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(9, 'Legal', 'LEG', 'Legal affairs', NULL, 22000.00, 'Block I', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(10, 'Operations', 'OPS', 'Operations management', NULL, 27000.00, 'Block J', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(20, 'Marketin', 'MKTS', 'Handles all marketing activities', 12, 0.00, NULL, 1, '2025-06-10 05:44:37', '2025-06-10 05:44:37');

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `leave_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `leave_type` enum('annual','sick','casual','maternity','paternity','other') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `approved_by` int(11) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `year` varchar(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaves`
--

INSERT INTO `leaves` (`leave_id`, `user_id`, `leave_type`, `start_date`, `end_date`, `reason`, `status`, `approved_by`, `rejection_reason`, `year`, `created_at`, `updated_at`) VALUES
(1, 4, 'annual', '2025-06-01', '2025-06-10', 'Vacation', 'approved', 3, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(2, 5, 'sick', '2025-05-15', '2025-05-18', 'Flu', 'approved', 2, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(3, 6, 'casual', '2025-04-20', '2025-04-22', 'Family event', 'pending', NULL, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(4, 7, 'maternity', '2025-03-01', '2025-06-01', 'Maternity leave', 'approved', 2, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(5, 8, 'annual', '2025-07-10', '2025-07-15', 'Travel', 'pending', NULL, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(6, 9, 'sick', '2025-02-05', '2025-02-07', 'Fever', 'rejected', 3, 'Insufficient documentation', '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(7, 10, 'casual', '2025-08-01', '2025-08-03', 'Personal', 'approved', 1, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(8, 4, 'annual', '2025-09-01', '2025-09-05', 'Holiday', 'pending', NULL, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(9, 5, 'sick', '2025-10-12', '2025-10-14', 'Cold', 'approved', 2, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(10, 6, 'casual', '2025-11-20', '2025-11-22', 'Family', 'pending', NULL, NULL, '2025', '2025-06-10 04:23:02', '2025-06-10 04:23:02');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('leave','transfer','user','other') NOT NULL,
  `message` varchar(255) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `related_resource_id` int(11) DEFAULT NULL,
  `resource_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `type`, `message`, `is_read`, `related_resource_id`, `resource_type`, `created_at`) VALUES
(1, 4, 'leave', 'Your leave request has been approved.', 1, 1, 'leave', '2025-06-10 04:23:02'),
(2, 5, 'leave', 'Your sick leave was approved.', 1, 2, 'leave', '2025-06-10 04:23:02'),
(3, 6, 'leave', 'Your casual leave is pending.', 0, 3, 'leave', '2025-06-10 04:23:02'),
(4, 7, 'leave', 'Your maternity leave was approved.', 1, 4, 'leave', '2025-06-10 04:23:02'),
(5, 8, 'leave', 'Your annual leave request is pending.', 0, 5, 'leave', '2025-06-10 04:23:02'),
(6, 9, 'leave', 'Your sick leave was rejected.', 1, 6, 'leave', '2025-06-10 04:23:02'),
(7, 10, 'leave', 'Your casual leave was approved.', 1, 7, 'leave', '2025-06-10 04:23:02'),
(8, 4, 'transfer', 'Your transfer request is pending.', 0, 1, 'transfer', '2025-06-10 04:23:02'),
(9, 5, 'transfer', 'Your transfer was approved.', 1, 2, 'transfer', '2025-06-10 04:23:02'),
(10, 6, 'transfer', 'Your transfer was rejected.', 1, 4, 'transfer', '2025-06-10 04:23:02');

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `transfer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_department_id` int(11) NOT NULL,
  `to_department_id` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `approved_by` int(11) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfers`
--

INSERT INTO `transfers` (`transfer_id`, `user_id`, `from_department_id`, `to_department_id`, `reason`, `status`, `approved_by`, `rejection_reason`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 2, 'Seeking new challenges', 'pending', NULL, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(2, 5, 3, 4, 'Closer to home', 'approved', 2, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(3, 6, 5, 6, 'Career growth', 'pending', NULL, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(4, 7, 6, 7, 'Department restructuring', 'rejected', 1, 'Position unavailable', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(5, 8, 8, 9, 'Skill match', 'approved', 3, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(6, 9, 9, 10, 'Project assignment', 'pending', NULL, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(7, 10, 10, 1, 'Rotation program', 'pending', NULL, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(8, 4, 1, 3, 'Interest in finance', 'approved', 2, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(9, 5, 3, 2, 'Marketing opportunity', 'pending', NULL, NULL, '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(10, 6, 5, 4, 'Personal reasons', 'rejected', 1, 'Not eligible', '2025-06-10 04:23:02', '2025-06-10 04:23:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` enum('admin','hr','manager','employee') NOT NULL DEFAULT 'employee',
  `department_id` int(11) DEFAULT NULL,
  `employment_type` enum('full-time','part-time','contract','intern') NOT NULL DEFAULT 'full-time',
  `salary` decimal(12,2) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `role`, `department_id`, `employment_type`, `salary`, `phone`, `address`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'jdoe', 'jdoe@example.com', '$2a$10$hash1', 'John', 'Doe', 'admin', 1, 'full-time', 80000.00, '1234567890', '123 Main St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(2, 'asmith', 'asmith@example.com', '$2a$10$hash2', 'Alice', 'Smith', 'hr', 4, 'full-time', 60000.00, '1234567891', '456 Oak St', 0, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 16:56:44'),
(3, 'bwhite', 'bwhite@example.com', '$2a$10$hash3', 'Bob', 'White', 'manager', 2, 'full-time', 70000.00, '1234567892', '789 Pine St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(4, 'cgreen', 'cgreen@example.com', '$2a$10$hash4', 'Carol', 'Green', 'employee', 1, 'part-time', 40000.00, '1234567893', '321 Elm St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(5, 'dblack', 'dblack@example.com', '$2a$10$hash5', 'David', 'Black', 'employee', 3, 'contract', 35000.00, '1234567894', '654 Maple St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(6, 'emartin', 'emartin@example.com', '$2a$10$hash6', 'Emma', 'Martin', 'employee', 5, 'full-time', 42000.00, '1234567895', '987 Cedar St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(7, 'flee', 'flee@example.com', '$2a$10$hash7', 'Frank', 'Lee', 'employee', 6, 'intern', 15000.00, '1234567896', '159 Spruce St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(8, 'gclark', 'gclark@example.com', '$2a$10$hash8', 'Grace', 'Clark', 'manager', 7, 'full-time', 65000.00, '1234567897', '753 Birch St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(9, 'hyoung', 'hyoung@example.com', '$2a$10$hash9', 'Henry', 'Young', 'employee', 8, 'part-time', 32000.00, '1234567898', '852 Willow St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(10, 'ijones', 'ijones@example.com', '$2a$10$hash10', 'Ivy', 'Jones', 'employee', 9, 'full-time', 37000.00, '1234567899', '951 Poplar St', 1, '2025-06-10 04:23:02', '2025-06-10 04:23:02', '2025-06-10 04:23:02'),
(11, 'hr.admin', 'hr.admin@company.com', '$2b$10$54F80A3eTqa8IydJX2l3aO61rfEoEO9ztroirM7LQA4xeVqNSK3XW', 'HR', 'Admin', 'admin', 1, 'full-time', 75000.00, '+233553994848', 'New Town Street', 1, '2025-06-11 08:16:56', '2025-06-10 04:23:10', '2025-06-11 08:16:56'),
(12, 'john.doe', 'john.doe@company.com', '$2b$10$bxbzCEHe4MTe2Q.dPrydMuL8wAnFXdNhKUSM0ZHynzZ7q3pRcEZFC', 'John', 'Doe', 'employee', 1, 'full-time', 50000.00, NULL, NULL, 1, NULL, '2025-06-10 05:28:22', '2025-06-10 05:28:22'),
(13, 'Timothy', 'hr@company.com', '$2b$10$FjfFuOTM7SaNGIlF2asI5eMTISJ7jeOw/gbHnHsmaX5neykaq6lIG', 'HR', 'Admin', 'admin', 1, 'full-time', 75000.00, NULL, NULL, 1, NULL, '2025-06-11 10:58:23', '2025-06-11 10:58:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_departments_name` (`name`),
  ADD KEY `idx_departments_code` (`code`),
  ADD KEY `idx_departments_manager` (`manager_id`),
  ADD KEY `departments_name` (`name`),
  ADD KEY `departments_code` (`code`),
  ADD KEY `departments_manager_id` (`manager_id`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `idx_leaves_user_year` (`user_id`,`year`),
  ADD KEY `idx_leaves_status` (`status`),
  ADD KEY `idx_leaves_approved_by` (`approved_by`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `idx_notifications_user` (`user_id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `idx_transfers_user` (`user_id`),
  ADD KEY `idx_transfers_from_department` (`from_department_id`),
  ADD KEY `idx_transfers_to_department` (`to_department_id`),
  ADD KEY `idx_transfers_status` (`status`),
  ADD KEY `idx_transfers_approved_by` (`approved_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_username` (`username`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_department` (`department_id`),
  ADD KEY `idx_users_role` (`role`),
  ADD KEY `users_username` (`username`),
  ADD KEY `users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_departments_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `leaves`
--
ALTER TABLE `leaves`
  ADD CONSTRAINT `fk_leaves_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_leaves_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `fk_transfers_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_transfers_from_department` FOREIGN KEY (`from_department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_transfers_to_department` FOREIGN KEY (`to_department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_transfers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
