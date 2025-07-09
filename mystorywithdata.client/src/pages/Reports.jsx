import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  EyeIcon, 
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Reports', count: 12 },
    { id: 'sales', name: 'Sales', count: 4 },
    { id: 'marketing', name: 'Marketing', count: 3 },
    { id: 'operations', name: 'Operations', count: 3 },
    { id: 'finance', name: 'Finance', count: 2 }
  ];

  const reports = [
    {
      id: 1,
      title: 'Sales Performance Dashboard',
      category: 'sales',
      description: 'Comprehensive analysis of sales metrics, trends, and team performance across all regions.',
      lastUpdated: '2024-01-15',
      views: 1234,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tags: ['Revenue', 'KPIs', 'Performance']
    },
    {
      id: 2,
      title: 'Marketing Campaign Analytics',
      category: 'marketing',
      description: 'Deep dive into campaign performance, ROI analysis, and customer acquisition metrics.',
      lastUpdated: '2024-01-14',
      views: 892,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      tags: ['Campaigns', 'ROI', 'Customer']
    },
    {
      id: 3,
      title: 'Financial Health Overview',
      category: 'finance',
      description: 'Real-time financial metrics, budget tracking, and expense analysis for strategic planning.',
      lastUpdated: '2024-01-13',
      views: 756,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      tags: ['Budget', 'Expenses', 'Planning']
    },
    {
      id: 4,
      title: 'Operations Efficiency Report',
      category: 'operations',
      description: 'Monitor operational KPIs, resource utilization, and process optimization opportunities.',
      lastUpdated: '2024-01-12',
      views: 634,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      tags: ['Efficiency', 'Resources', 'KPIs']
    },
    {
      id: 5,
      title: 'Customer Behavior Analysis',
      category: 'marketing',
      description: 'Understanding customer journey, preferences, and behavioral patterns for better targeting.',
      lastUpdated: '2024-01-11',
      views: 543,
      thumbnail: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop',
      tags: ['Behavior', 'Journey', 'Targeting']
    },
    {
      id: 6,
      title: 'Supply Chain Analytics',
      category: 'operations',
      description: 'Track inventory, supplier performance, and logistics efficiency across the supply chain.',
      lastUpdated: '2024-01-10',
      views: 421,
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      tags: ['Inventory', 'Suppliers', 'Logistics']
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white shadow-sm">
        <div className="container-width section-padding py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Power BI Reports
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore interactive dashboards and reports that transform complex data 
              into actionable insights for your business decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-width section-padding py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-1 text-xs">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-12">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={report.thumbnail}
                    alt={report.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                      {report.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <EyeIcon className="w-4 h-4 mr-2" />
                      View Report
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {report.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(report.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {report.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Custom Reports?
            </h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Let's create tailored Power BI dashboards that address your specific 
              business needs and objectives.
            </p>
            <button className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold inline-flex items-center">
              Request Custom Report
              <ArrowTopRightOnSquareIcon className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Reports;
