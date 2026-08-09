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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Rice & Corn Disease Dataset Catalog</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
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
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">Crop:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              {(['All', 'Rice', 'Corn'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setCropFilter(crop)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    cropFilter === crop
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">Pathogen:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              {(['All', 'Fungal', 'Bacterial', 'Healthy'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
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
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Leaf Thumbnail */}
              <div className="relative h-48 bg-slate-950 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={item.sampleImageUrl}
                  alt={item.diseaseName}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
                
                <div className="absolute top-3 left-3 flex space-x-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[10px] font-bold border border-slate-700">
                    {item.crop}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur-md text-slate-300 text-[10px] font-semibold border border-slate-700">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      item.severity === 'Severe'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : item.severity === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>

              {/* Disease Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.diseaseName}
                </h3>
                <p className="text-xs italic text-slate-400">
                  {item.scientificName}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Key Symptoms */}
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400">Key Diagnostic Markers:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.keySymptoms.slice(0, 3).map((sym, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        • {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Sample Dataset ID: #{item.id}</span>
              <button
                onClick={() => onSelectSample(item)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Diagnostic Pipeline</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
