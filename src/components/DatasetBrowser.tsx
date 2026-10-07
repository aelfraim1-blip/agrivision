import React, { useState } from 'react';
import { SAMPLE_DATASET } from '../data/sampleDataset';
import { SampleDatasetItem, CropType, DiseaseCategory } from '../types';
import { BookOpen, Search, Filter, Play, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DatasetBrowserProps {
  onSelectSample: (item: SampleDatasetItem) => void;
}

export const DatasetBrowser: React.FC<DatasetBrowserProps> = ({ onSelectSample }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cropFilter, setCropFilter] = useState<'All' | 'Rice' | 'Corn'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredDataset = SAMPLE_DATASET.filter((item) => {
    const matchesSearch =
      (item.diseaseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scientificName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCrop = cropFilter === 'All' || item.crop === cropFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCrop && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header */}
      <div className="bg-white border border-emerald-900/10 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-800" />
              <h2 className="text-xl font-extrabold text-emerald-950">Rice &amp; Corn Disease Dataset Catalog</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Curated dataset of rice and corn foliar diseases for pipeline evaluation and diagnostic reference.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search disease name or pathogen..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-900/10 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-600 font-bold">Crop:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {(['All', 'Rice', 'Corn'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setCropFilter(crop)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    cropFilter === crop
                      ? 'bg-[#064e3b] text-white font-bold ring-1 ring-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-emerald-950'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-600 font-bold">Pathogen:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {(['All', 'Fungal', 'Fungal/Oomycete', 'Bacterial', 'Viral', 'Healthy'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#064e3b] text-white font-bold ring-1 ring-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-emerald-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDataset.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-md hover:border-amber-500/60 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Leaf Thumbnail */}
              <div className="relative h-48 bg-emerald-50/20 overflow-hidden flex items-center justify-center p-2 border-b border-emerald-900/10">
                <img
                  src={item.sampleImageUrl}
                  alt={item.diseaseName}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
                
                <div className="absolute top-3 left-3 flex space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-emerald-900 text-[10px] font-bold border border-emerald-900/15 shadow-xs">
                    {item.crop}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-700 text-[10px] font-semibold border border-slate-200 shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs ${
                      item.severity === 'Severe'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300'
                        : item.severity === 'Moderate'
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>

              {/* Disease Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-extrabold text-emerald-950 group-hover:text-emerald-800 transition-colors">
                  {item.diseaseName}
                </h3>
                <p className="text-xs italic text-slate-500">
                  {item.scientificName}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Key Symptoms */}
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700">Key Diagnostic Markers:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.keySymptoms.slice(0, 3).map((sym, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50/60 text-emerald-950 border border-emerald-900/10 font-medium">
                        • {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-emerald-900/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Sample #{item.id}</span>
              <button
                onClick={() => onSelectSample(item)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Diagnostic</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
