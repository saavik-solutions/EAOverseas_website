import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

const UniversityKnowledgeHub = () => {
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <PageHeader
                title="University Knowledge Hub"
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-[1600px] mx-auto">
                    {/* Page Heading and Intro */}
                    <div className="flex flex-col gap-2 mb-8">
                        <p className="text-gray-500 text-lg font-normal">A centralized database of universities, costs, loans, and visa details.</p>
                    </div>

                    {/* Filter & Search Bar Panel */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search Bar Component */}
                            <div className="flex-1 w-full">
                                <label className="flex flex-col min-w-40 h-11 w-full">
                                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <div className="text-gray-400 flex items-center justify-center pl-4">
                                            <span className="material-symbols-outlined">search</span>
                                        </div>
                                        <input
                                            className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 placeholder:text-gray-400 px-4 text-gray-900 text-base font-normal leading-normal"
                                            placeholder="Search by university name"
                                            defaultValue=""
                                        />
                                    </div>
                                </label>
                            </div>
                            {/* Chips / Dropdowns */}
                            <div className="flex gap-2 flex-wrap justify-start lg:justify-end w-full lg:w-auto">
                                {['Country', 'Course Type', 'Budget', 'Ranking', 'Intake'].map((filter) => (
                                    <button key={filter} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white px-4 border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors flex-1 lg:flex-none">
                                        <p className="text-sm font-medium leading-normal whitespace-nowrap">{filter}</p>
                                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Data Table Container */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto @container">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider min-w-[240px]">University</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider">Country</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider">Tuition</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider">Living Cost</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider">Ranking</th>
                                        <th className="px-6 py-4 text-gray-900 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-900">Oxford University</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">UK</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">Computer Science</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$45,000</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$15,000</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center text-gray-900 font-bold text-sm">#1</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Loan Info</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Visa Info</button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-900">Stanford University</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">USA</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">Data Science</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$55,000</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$20,000</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center text-gray-900 font-bold text-sm">#2</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Loan Info</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Visa Info</button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-900">University of Toronto</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">Canada</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">Engineering</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$35,000</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$12,000</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center text-gray-900 font-bold text-sm">#18</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Loan Info</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Visa Info</button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-900">Technical University of Munich</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">Germany</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">AI & Robotics</td>
                                        <td className="px-6 py-5 text-green-600 text-sm font-semibold">Free</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$10,000</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center text-gray-900 font-bold text-sm">#50</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Loan Info</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Visa Info</button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-900">National University of Singapore</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">Singapore</span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">Business Management</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$40,000</td>
                                        <td className="px-6 py-5 text-gray-500 text-sm">$15,000</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center text-gray-900 font-bold text-sm">#11</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 rounded border border-blue-600 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">View Details</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Loan Info</button>
                                                <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-500 text-xs font-bold hover:border-blue-600 hover:text-blue-600 transition-all">Visa Info</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-sm text-gray-500">Showing 1 to 5 of 248 universities</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
                                <button className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-white transition-colors">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UniversityKnowledgeHub;
